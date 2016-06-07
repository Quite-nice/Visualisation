/**
 * Created by Kymer on 1/06/16.
 */
import { Meteor } from 'meteor/meteor'
import { Events } from '/imports/api/events/events'

Meteor.publish('allEvents', () => {
	return Events.find()
})

Meteor.publish('event', (id) => {
	return Events.findOne({_id: id})
})

Meteor.publish('eventsReceivedByModule', (id) => {
	return Events.find({receiverId: id})
})

Meteor.publish('eventsSentByModule', (id) => {
	return Events.find({senderId: id})
})

Meteor.publish('eventsWithinTimeSpan', (dateFrom, dateTo) => {
	return Events.find({
		timestamp: {
			$gte: dateFrom,
			$lt: dateTo
		}
	}, {sort: {timestamp: -1}})
})