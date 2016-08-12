/**
 * Created by Jeroen on 02/06/16.
 */

import './eventList.html'
import './expandableEvent'

import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

Template.ExpandableEventsList.onCreated(function() {
	this.stickToBottom = new ReactiveVar(true);
});

Template.ExpandableEventsList.helpers({
	stickToBottom() {return Template.instance().stickToBottom.get()}
});

Template.ExpandableEventsList.events({
	'click .js-stick'(event, template) {
		template.stickToBottom.set(true);
		const list = template.find('.js-expandableEventsList');
		list.scrollTop = list.scrollHeight;
	},
	'wheel .js-expandableEventsList'(event, template) {
		template.stickToBottom.set(false);
	}
});

Template.ExpandableEventsList.onRendered(function() {
	const list = this.find('.js-expandableEventsList');
	const stickToBottom = this.stickToBottom;
	list._uihooks = {
		insertElement(node, next) {
			$(node).insertBefore(next);
			if (stickToBottom.get()) list.scrollTop = list.scrollHeight;
		}
	}
});