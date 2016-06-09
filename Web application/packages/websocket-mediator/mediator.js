import { webSocketService } from './discovery'
import { Events,  Modules } from 'meteor/database'
import './methods'

Modules.upsert({type: 'websocket-mediator'}, {$set: {
	parentId: null,
	name: 'Websocket mediator'
}});

export const mediatorId = Modules.findOne({type: 'websocket-mediator'})._id;

Events.insert({
	senderId: mediatorId,
	type: 'stateChange',
	payload: 1,
	date: new Date()
});