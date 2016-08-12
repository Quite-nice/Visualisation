/**
 * Created by Jeroen on 02/06/16.
 */
import './MiniView.html'

import {Events} from 'meteor/visualisation:database'
import '../ExpandableEventsList/eventList'
import './StateLabel'

Template.GenericModuleContainer.onCreated(function (){
	const template = this;

	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})
})

Template.GenericModuleContainer.helpers({
	sentEvents(){
		return Events.find({senderId: this.module._id}, {sort: {date: -1}})
	}
})

Template.GenericModule.helpers({
	single: number => number==1
})