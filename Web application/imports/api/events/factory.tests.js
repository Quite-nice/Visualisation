/**
 * Created by Kymer on 8/06/16.
 */
import {Events} from '/imports/api/events/events'
import {Factory} from 'meteor/dburles:factory'
import faker from 'faker'

Factory.define('event', Events, {
	senderId: () => Factory.get('branchesModule'),
	receiverId: () => Factory.get('branchesModule'),
	date: () => new Date(),
	type: 'commit',
	payload: {
		hash: () => faker.random.uuid(),
		author: () => faker.name.findName(),
		message: () => faker.hacker.phrase()
	}
})