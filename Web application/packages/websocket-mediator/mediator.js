import { webSocketService } from './discovery'
import { Events,  Modules } from 'meteor/visualisation:database'
import './methods'

Modules.upsert({type: 'websocket-mediator'}, {$set: {
	parentId: null,
	name: 'Websocket mediator'
}});

export const mediatorId = Modules.findOne({type: 'websocket-mediator'})._id;

Events.insert({
	senderId: mediatorId,
	type: 'state',
	payload: 1,
	date: new Date()
});