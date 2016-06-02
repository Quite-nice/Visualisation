// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See githubMock-tests.js for an example of importing.

import {branches, branchesId, issuesId, issues} from 'modules'

Meteor.publish('githubMock', function() {
	this.added('modules', branchesId, branches);
	this.added('modules', issuesId, issues);

	for (let event in events) {
		this.added('events', new Mongo.ObjectID(), event);
	}
});

const events = [
	{
		hash: 'ab65',
		author: 'Damiaan',
		message: 'init',
		date: new Date(),
		senderId: branchesId
	}, {
		hash: 'ab69',
		author: 'Jeroen',
		message: 'add spul',
		date: new Date(),
		senderId: branchesId
	}, {
		hash: 'ab35',
		author: 'Kymer',
		message: 'add ding',
		date: new Date(),
		senderId: branchesId
	}
];