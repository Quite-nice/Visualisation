// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See tests.js for an example of importing.

import {branches, branchesId, issuesId, issues} from './modules'
import {events} from './events'

Meteor.publish('mockGithub', function() {
	this.added('modules', branchesId, branches);
	this.added('modules', issuesId, issues);

	for (let event of events) {
		this.added('events', new Mongo.ObjectID(), event);
	}

	this.ready()
});