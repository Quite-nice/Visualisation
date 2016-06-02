import { expect } from 'meteor/practicalmeteor:chai';
import { Mongo } from 'meteor/mongo'

const Modules = new Mongo.Collection('modules');
const Events = new Mongo.Collection('events');

describe('GitHub mock data module', function() {
	it('should add an "issues" module', function() {
		expect( Modules.find({type: 'collection', name: 'Issues'}).count() ).to.be(1);
	});

	it('should add a basic commit', function() {
		expect( Events.find({type: 'commit', name: 'Issues'}).count() ).to.be.at.least(1);
	});
});