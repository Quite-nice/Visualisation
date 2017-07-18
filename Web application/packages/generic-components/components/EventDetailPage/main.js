/**
 * Created by Jeroen on 02/06/16.
 */

import './main.html'
import './style.css'
import {Events} from 'meteor/visualisation:database'
import {ReactiveVar} from 'meteor/reactive-var'

const template = Template.EventDetailPage
const container = Template.EventDetailPageContainer

container.onCreated(function() {
	const template = this;

	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})
})

container.helpers({
	eventsCursor: function() {
		return Events.find({senderId: this.module._id}, {sort: {date: 1}})
	}
})

template.onCreated(function() {
	this.selection = new ReactiveVar(null);
	this.stickToBottom = new ReactiveVar(true);
	this.autorun(() => {
		const selectionHook = Template.currentData().selectionHook;
		if (typeof selectionHook == 'function') selectionHook(this.selection);
	})
})

template.helpers({
	selected(event) {
		return event._id == Template.instance().selection.get()
	},
	selectedEvent(cursor) {
		const id = Template.instance().selection.get()
		if (id == null) return undefined
		return cursor.collection.findOne(id)
	},
	stickToBottom() {return Template.instance().stickToBottom.get()}
})

template.events({
	'click .js-item'(event, template) {
		template.selection.set(this._id)
	},
	'click .js-stick'(event, template) {
		template.stickToBottom.set(true);
		const list = template.find('.js-eventsList');
		list.scrollTop = list.scrollHeight;
	},
	'wheel .js-eventsList'(event, template) {
		template.stickToBottom.set(false);
	}
})

template.onRendered(function() {
	const list = this.find('.js-eventsList');
	const stickToBottom = this.stickToBottom;
	list._uihooks = {
		insertElement(node, next) {
			$(node).insertBefore(next);
			if (stickToBottom.get()) list.scrollTop = list.scrollHeight;
		}
	}
});