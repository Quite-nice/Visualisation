import { Meteor } from 'meteor/meteor'
import { Events, Modules } from 'meteor/visualisation:database'
import rootModule from './rootModule'
import Zyre from 'zyre.js'

const zreObserver = new Zyre({name: 'MeteorJS visualisation'})

const zreNodeModuleType = 'ZRE node'
const zreNodeModuleIdPrefix = 'ZRE-node:'

Modules.remove({type: zreNodeModuleType})

zreObserver.on('connect', Meteor.bindEnvironment((id, name, header) => {
	console.log('zre node connected', id, name, header)

	const visualisationID = visualisationIdFor(id)

	Modules.upsert(visualisationID, {
		$set: {
			type: zreNodeModuleType,
			header,
			name,
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

zreObserver.on('shout', Meteor.bindEnvironment((peerId, name, message, group) => {
	Events.insert({
		senderId: visualisationIdFor(peerId),
		type: 'shout',
		group,
		payload: message,
		date: new Date()
	})
}))

zreObserver.on('disconnect', Meteor.bindEnvironment((id, name) => {
	const visualisationID = visualisationIdFor(id)

	Events.insert({
		senderId: visualisationID,
		type: 'state',
		payload: 0,
		date: new Date()
	})
}))

zreObserver.start(function() {
	zreObserver.join('visualisation')

	console.log('zre observer started')
	Events.insert({
		senderId: rootModule._id,
		type: 'state',
		payload: 2,
		date: new Date()
	})
})

function visualisationIdFor(zreID) {
	return zreNodeModuleIdPrefix + zreID
}