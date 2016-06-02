/**
 * Created by Kymer on 1/06/16.
 */

Meteor.publish('allEvents', () => {
	return Events.find()
})

Meteor.publish('event', (id) => {
	return Events.findOne({_id: id})
})