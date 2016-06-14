import {mediatorId} from './mediator'
import {Events} from 'meteor/visualisation:database'

const os = require('os');
const url = require('url');
const bonjour = require('bonjour')();

const rootURL = url.parse(process.env['ROOT_URL']);

export const webSocketService = bonjour.publish({
	name: 'Visualisation webserver',
	port: rootURL.port,
	type: 'websocket',
	txt: {
		url: `ws://${os.hostname()}:${rootURL.port}${rootURL.pathname}websocket`
	}
});

webSocketService.on('up', Meteor.bindEnvironment(function() {
	Events.insert({
		senderId: mediatorId,
		type: 'state',
		payload: 2,
		date: new Date()
	})
}));

webSocketService.start();