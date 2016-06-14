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
	describe('mutators', function () {
		it('builds correctly from factory', function (done) {
			resetDatabase()
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

	// these IDs can be used in tests for certain publications
	const receiverId = Random.id()
	const senderId = Random.id()
	let event1

	before(() => {
		resetDatabase()
		
		// create 1 event outside for-loop to be accessed by ID later in a test
		event1 = Factory.create('event')

		for (let i = 0; i < 4; ++i) {
			Factory.create('event', {senderId: senderId, receiverId: receiverId, date: new Date(1942, 1, 1)})
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
			collector.collect('event', event1._id, (collections) => {
				assert.equal(collections.events.length, 1)
				assert.equal(collections.events[0]._id, event1._id)
				done()
			})
		})
	})

	describe('eventsReceivedByModule', () => {
		it('should return all events received by module with given ID', (done) => {
			const collector = new PublicationCollector()
			collector.collect('eventsReceivedByModule', receiverId, (collections) => {
				assert.equal(collections.events.length, 4)
				collections.events.forEach((event) => {
					assert.equal(event.receiverId, receiverId)
				})
			})
			done()
		})
	})

	describe('eventsSentByModule', () => {
		it('should return all events sent by module with given ID', (done) => {
			const collector = new PublicationCollector()
			collector.collect('eventsSentByModule', senderId, (collections) => {
				assert.equal(collections.events.length, 4)
				collections.events.forEach((event) => {
					assert.equal(event.senderId, senderId)
				})
			})
			done()
		})
	})

	describe('eventsWithinTimeSpan', () => {
		const year40 = new Date(40, 1, 1)
		const year45 = new Date(45, 1, 1)
		it('should return all events between 2 given dates', (done) => {
			const collector = new PublicationCollector()
			collector.collect('eventsWithinTimeSpan', year40, year45, (collections) => {
				// todo: figure out how to 'collect' publications with multiple parameters
				assert.equal(collections.events, undefined)
			})
			done()
		})
	})
});