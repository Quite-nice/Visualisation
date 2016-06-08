/**
 * Created by Kymer on 1/06/16.
 */
import {Meteor} from 'meteor/meteor'
import {Events} from '/imports/api/events/events'
import {assert} from 'meteor/practicalmeteor:chai'
import {resetDatabase} from 'meteor/xolvio:cleaner'
import faker from 'faker'

// tests for the events publications

describe('Events', function () {
	beforeEach(function () {
		resetDatabase()
	});

	describe('mutators', function () {
		it('builds correctly from factory', function () {

			// this should create 1 event in the Events collection
			const event = Factory.create('event')
			assert.equal(Events.find().count(), 1)

			assert.typeOf(event, 'object')
			assert.typeOf(event.senderId, 'string')
			assert.typeOf(event.date, 'date')
			assert.typeOf(event.type, 'string')

			assert.typeOf(event.payload, 'object')
			assert.typeOf(event.payload.hash, 'string')
			assert.typeOf(event.payload.author, 'string')
			assert.typeOf(event.payload.message, 'string')
		})
	})
})

describe('Events publications', function () {
	beforeEach(function () {
		resetDatabase()
	});

	describe('allEvents', () => {
		it('should return all events', () => {
			// todo: add package to test publications (e.g. johanbrook:publication-collector)
		});
	});
});