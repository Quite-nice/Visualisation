// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See tests.js for an example of importing.

import {branches, branchesId, issuesId, issues, pullRequests, pullRequestsId} from './modules'
import {events} from './events'

Meteor.publish('mockGithub', function() {
	this.added('modules', branchesId, branches);
	this.added('modules', issuesId, issues);
	this.added('modules', pullRequestsId, pullRequests)

	Meteor.setInterval(()=>{
		for (let event of events) {
			this.added('events', new Mongo.ObjectID(), event);
		}
	}, 3000)

	this.ready()
});