import 'meteor/meteor'
import {Modules, Events} from 'meteor/visualisation:database'
import {mediatorId} from './mediator'

export const moduleIds = Symbol('Module id');

Meteor.onConnection(function(connection) {
	connection[moduleIds] = []

	connection.onClose(function() {
		if (connection[moduleIds].length > 0) {
			Modules.remove({_id: {$in: connection[moduleIds]}})
		}
	})
});

Meteor.methods({
	registerWebsocketModule({type, name}) {
		const id = Modules.insert({
			type,
			name,
			parentId: mediatorId
		});

		this.connection[moduleIds].push(id);
		return id
	},
	registerWebsocketEvent(event) {
		if (this.connection[moduleIds].indexOf(event.senderId) >= 0) {
			event.date = new Date();
			Events.insert(event)
		}
	}
})