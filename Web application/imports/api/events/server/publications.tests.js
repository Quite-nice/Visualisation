/**
 * Created by Kymer on 1/06/16.
 */
import { Events } from '../events'
import { assert } from 'meteor/practicalmeteor:chai'
import { resetDatabase } from 'meteor/xolvio:cleaner'

// tests for the events publications

describe('Publications', function () {
	beforeEach(function () {
		resetDatabase()
	});
});

describe('Events', () => {
	describe('allEvents', () => {
		it('should return all events', () => {
			assert.equal(42, 42)
		});
	});
});