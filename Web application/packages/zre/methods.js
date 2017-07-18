/**
 * Created by damiaan on 18/07/17.
 */

import { Meteor } from 'meteor/meteor'
import {zreNodeModuleIdPrefix, whisperMethodName} from './meta'
import zrePeer from './zre-peer'

Meteor.methods({
	[whisperMethodName](moduleId, message) {
		const peerId = moduleId.slice(zreNodeModuleIdPrefix.length)
		zrePeer.whisper(peerId, message)
	}
})