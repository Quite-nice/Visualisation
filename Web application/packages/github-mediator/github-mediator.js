// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See github-mediator-tests.js for an example of importing.

import {WebApp} from 'meteor/webapp'
import {Events} from 'meteor/core-collections'
import {Modules} from 'meteor/core-collections'

WebApp.connectHandlers.use("/githubMediator", function(request, response, next) {
	let body = [];
	request.on('data', function(chunk) {
		body.push(chunk);
	}).on('end', function() {
		body = Buffer.concat(body).toString();
		const event = {
			senderId: body.sender.login,
			timestamp: new Date(),
			payload: _.omit(body, 'sender'),
			type: request.headers['x-github-event']
		};
		Events.insert(event);
		console.log(event);
	});
	response.writeHead(200);
	response.end();
});