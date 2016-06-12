/**
 * Created by Jeroen on 02/06/16.
 */
import './MiniView.html'

import {Events} from '/imports/api/events/events'
import '/imports/ui/components/ExpandableEventsList/eventList'
import './StateLabel'

Template.GenericModule.onCreated(function (){
	const template = this;

	this.autorun(function() {
		const module = Template.currentData()
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})
})

Template.GenericModule.helpers({
	sentEvents(){
		return Events.find({senderId: this._id}, {sort: {date: -1}})
	},
	single: number => number==1
})