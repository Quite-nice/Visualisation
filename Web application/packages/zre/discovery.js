import { Meteor } from 'meteor/meteor'
import { Events, Modules } from 'meteor/visualisation:database'
import rootModule from './rootModule'
import zreObserver from './zre-peer'
import { zreModuleType as zreNodeModuleType, zreNodeModuleIdPrefix } from './meta'

Modules.remove({type: zreNodeModuleType})

/**
 * @type {Map<string, {flush: ?function, promise: Promise}>}
 */
const connectionWaitList = new Map()

zreObserver.on('connect', Meteor.bindEnvironment((id, name, header) => {
	const connection = connectionWaitList.get(id)
	if (connection === undefined) {
		connectionWaitList.set(id, { promise: Promise.resolve(id) })
	} else {
		connection.flush()
	}

	console.log('zre node connected', id, name, header)

	const visualisationID = visualisationIdFor(id)


	Modules.upsert(visualisationID, {
		$set: {
			type: zreNodeModuleType,
			header,
			name,
			groups: [],
			parentId: rootModule._id
		}
	})

	Events.insert({
		senderId: visualisationID,
		type: 'state',
		payload: 2,
		date: new Date()
	})
}))

zreObserver.on('whisper', Meteor.bindEnvironment((peerId, name, message) => {
	Events.insert({
		senderId: visualisationIdFor(peerId),
		type: 'whisper',
		payload: message,
		date: new Date()
	})
}))

zreObserver.on('shout', Meteor.bindEnvironment((peerId, name, message, group) => {
	Events.insert({
		senderId: visualisationIdFor(peerId),
		type: 'shout',
		group,
		payload: message,
		date: new Date()
	})
}))

zreObserver.on('join', Meteor.bindEnvironment((peerId, name, group) => {
	let connection = connectionWaitList.get(peerId)
	if (connection === undefined) {
		connection = {}
		connection.promise = new Promise(resolve => connection.flush = resolve)
		connectionWaitList.set(peerId, connection)
	}
	connection.promise.then(() => {
		console.log(peerId, name, 'joins', group)

		const visualisationId = visualisationIdFor(peerId)

		Events.insert({
			senderId: visualisationId,
			type: 'join',
			payload: group,
			date: new Date()
		})

		Modules.update(visualisationId, {
			$addToSet: {
				groups: group
			}
		})
		if (zreObserver.getGroup(group) === undefined || !zreObserver.getGroup(group).hasOwnProperty(zreObserver.getIdentity())) {
			console.log('Gui node is joining', group)
			zreObserver.join(group)
		}
	})
}))

zreObserver.on('leave', Meteor.bindEnvironment((peerId, name, group) => {
	console.log(peerId, name, 'leaves', group)
	const visualisationId = visualisationIdFor(peerId)

	Modules.update(visualisationId, {
		$pullAll: {
			groups: [group]
		}
	})

	Events.insert({
		senderId: visualisationId,
		type: 'leave',
		payload: group,
		date: new Date()
	})
}))

zreObserver.on('disconnect', Meteor.bindEnvironment((id, name) => {
	const visualisationID = visualisationIdFor(id)

	connectionWaitList.delete(id)

	Events.insert({
		senderId: visualisationID,
		type: 'state',
		payload: 0,
		date: new Date()
	})
}))

zreObserver.start(function() {
	console.log('zre observer started')
	Events.insert({
		senderId: rootModule._id,
		type: 'state',
		payload: 2,
		date: new Date()
	})

	zreObserver.join('visualisation')
})

process.on('SIGTERM', function() {
	console.log('V3 stopping zre node')
	zreObserver.stop()
		.then(() => process.exit(0))
		.catch(() => process.exit(128 + 1))
})

function visualisationIdFor(zreID) {
	return zreNodeModuleIdPrefix + zreID
}