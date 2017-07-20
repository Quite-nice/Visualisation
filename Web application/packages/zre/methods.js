/**
 * Created by damiaan on 18/07/17.
 */

import { Meteor } from 'meteor/meteor'
import { Events } from 'meteor/visualisation:database'
import rootModule from './rootModule'
import {zreNodeModuleIdPrefix, whisperMethodName, shoutMethodName, restartMethodName} from './meta'
import zrePeer from './zre-peer'

Meteor.methods({
	[whisperMethodName](moduleId, message) {
		const peerId = moduleId.slice(zreNodeModuleIdPrefix.length)
		const payload = serialise(message)
		zrePeer.whisper(peerId, payload)
		Events.insert({
			senderId: rootModule._id,
			type: 'whisper',
			payload,
			date: new Date()
		})
	},

	[shoutMethodName](group, message) {
		const payload = serialise(message)
		zrePeer.shout(group, payload)
		Events.insert({
			senderId: rootModule._id,
			type: 'shout',
			group,
			payload,
			date: new Date()
		})
	},

	[restartMethodName]() {
		zrePeer.stop().then(() => {
			zrePeer.start()
		})
	}
})

/**
 * @param message {string|Object}
 * @returns {String}
 */
function serialise(message) {
	if (message instanceof String) return message
	else return JSON.stringify(message)
}