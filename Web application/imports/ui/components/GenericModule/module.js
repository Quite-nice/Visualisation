/**
 * Created by Jeroen on 02/06/16.
 */
import './module.html'

import {Events} from '/imports/api/events/events'
import '/imports/ui/components/ExpandableEventsList/event'
import './StateLabel'

Template.GenericModule.onCreated(function (){
	const module = this.data
	this.subscribe('eventsSentByModule', module._id)
	this.subscribe('subModuleCount', module._id)
	this.subscribe('moduleState', module._id)
})

Template.GenericModule.helpers({
	sentEvents(){
		return Events.find({senderId: this._id}, {sort: {date: -1}})
	},
	single: number => number==1
})