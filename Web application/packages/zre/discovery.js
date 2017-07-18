import Zyre from 'zyre.js'
import { Events, Modules } from 'meteor/visualisation:database'
import rootModule from './rootModule'

const zreObserver = new Zyre({name: 'MeteorJS visualisation'})

zreObserver.start(function() {
	Events.insert({
		senderId: rootModule._id,
		type: 'state',
		payload: 2,
		date: new Date()
	})
})