/**
 * Created by Jeroen on 02/06/16.
 */

import './main.html'
import {Events} from '/imports/api/events/events'
import {ReactiveVar} from 'meteor/reactive-var'

const template = Template.EventDetailPage;

template.onCreated(function() {
	const template = this;

	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})

	template.selection = new ReactiveVar(null)
})

template.helpers({
	eventsCursor: function() {
		return Events.find({senderId: this.module._id}, {sort: {date: -1}})
	},
	selected(event) {
		return event._id == Template.instance().selection.get()
	},
	selectedEvent() {
		const id = Template.instance().selection.get()
		if (id == null) return undefined
		return Events.findOne(id)
	}
})

template.events({
	'click .js-item'(event, template) {
		template.selection.set(this._id)
	}
})