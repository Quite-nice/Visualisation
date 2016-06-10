/**
 * Created by Jeroen on 02/06/16.
 */
import './module.html'

import {Events} from '/imports/api/events/events'
import '/imports/ui/components/ExpandableEventsList/event'

Template.GenericModule.onCreated(function (){
	Meteor.subscribe('eventsSentByModule', this.data._id)
})

Template.GenericModule.helpers({
	sentEvents(){
		return Events.find({senderId: this._id}, {sort: {date: -1}})
	}
})