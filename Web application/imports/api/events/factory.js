/**
 * Created by Kymer on 8/06/16.
 */
import {Events} from '/imports/api/events/events'
import {Factory} from 'meteor/dburles:factory'
import Faker from 'Faker'

Factory.define('event', Events, {
	senderId: () => Factory.get('branchesModule'),
	date: () => new Date(),
	type: 'commit',
	payload: {
		hash: () => Faker.random.alphaNumeric(),
		author: () => Faker.name.findName(),
		message: () => Faker.hacker.phrase()
	}
})
