/**
 * Created by Kymer on 1/06/16.
 */
import {Meteor} from 'meteor/meteor'
import {Events} from '/imports/api/events/events'
import {assert} from 'meteor/practicalmeteor:chai'
import {resetDatabase} from 'meteor/xolvio:cleaner'
import { Random } from 'meteor/random'
import {PublicationCollector} from 'meteor/johanbrook:publication-collector'

// tests for the events publications

describe('Events', function () {
	beforeEach(function () {
		resetDatabase()
	});

	describe('mutators', function () {
		it('builds correctly from factory', function (done) {

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

			done()
		})
	})
})

describe('Events publications', function () {
	require('/imports/api/events/server/publications.js')

	// this id can be used in tests for certain publications
	let eventId = Random.id()

	before(() => {
		resetDatabase()

		// create 1 event with the ID we created earlier, so we can fetch it if needed
		const event = Factory.create('event', {_id: eventId})

		// create some more events to fill the Events collection
		for (let i = 0; i < 4; ++i) {
			const event = Factory.create('event')
		}
	})

	describe('allEvents', () => {
		it('should return all events', (done) => {
			const collector = new PublicationCollector()
			collector.collect('allEvents', (collections) => {
				assert.equal(collections.events.length, 5)
				done()
			})
		});
	});

	describe('event', () => {
		it('should return 1 event with given ID', (done) => {
			const collector = new PublicationCollector()
			collector.collect('event', eventId, (collections) => {
				assert.equal(collections.events.length, 1)
				assert.equal(collections.events[0]._id, eventId)
				done()
			})
		})
	})
});