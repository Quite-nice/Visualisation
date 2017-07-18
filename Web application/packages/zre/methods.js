/**
 * Created by damiaan on 18/07/17.
 */

import { Meteor } from 'meteor/meteor'
import { Events } from 'meteor/visualisation:database'
import rootModule from './rootModule'
import {zreNodeModuleIdPrefix, whisperMethodName} from './meta'
import zrePeer from './zre-peer'

Meteor.methods({
	[whisperMethodName](moduleId, message) {
		const peerId = moduleId.slice(zreNodeModuleIdPrefix.length)
		zrePeer.whisper(peerId, message)
		Events.insert({
			senderId: rootModule._id,
			type: 'whisper',
			payload: message,
			date: new Date()
		})
	}
})