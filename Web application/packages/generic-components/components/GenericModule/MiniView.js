/**
 * Created by Jeroen on 02/06/16.
 */
import './MiniView.html'

import {Events} from 'meteor/visualisation:database'
import '../ExpandableEventsList/eventList'
import './StateLabel'

Template.GenericModule.onCreated(function (){
	const template = this;

	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})
})

Template.GenericModule.helpers({
	sentEvents(){
		return Events.find({senderId: this.module._id}, {sort: {date: -1}})
	},
	single: number => number==1
})