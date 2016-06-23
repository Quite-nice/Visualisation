import {mediatorId} from './mediator'
import {Events} from 'meteor/visualisation:database'

const os = require('os');
const url = require('url');
const mdns = require('mdns');

const rootURL = url.parse(process.env['ROOT_URL']);

ad = mdns.createAdvertisement(mdns.tcp('websocket'), parseInt(rootURL.port), {
	txtRecord: {
		url: `ws://${os.hostname()}:${rootURL.port}${rootURL.pathname}websocket`
	}
});
ad.start();

Events.insert({
	senderId: mediatorId,
	type: 'state',
	payload: 2,
	date: new Date()
})