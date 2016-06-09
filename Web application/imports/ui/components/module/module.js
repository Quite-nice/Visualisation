/**
 * Created by Jeroen on 02/06/16.
 */
import './module.html'

import {Events} from '/imports/api/events/events'
import {GenericEvent} from '/imports/ui/components/event/event'
//import 'meteor/mock-github'

Template.GenericModule.onCreated(function (){
	Meteor.subscribe('eventsReceivedByModule', this._id)
	//Meteor.subscribe('mock-github')
})

Template.GenericModule.helpers({
	sentEvents(){
		return Events.find({senderId: this._id}, {limit:10, sort: {date: -1}})
	}
})

