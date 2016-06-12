import './Object.html'
import {ReactiveVar} from 'meteor/reactive-var'

const template = Template.JsonObjectView;

template.onCreated(function() {
	this.expand = new ReactiveVar(false);
});

template.helpers({
	expand() {
		return Template.instance().expand.get()
	},
	expandable() {
		return this[1] instanceof Date ? false : true
	},
	stringRepresentation(object) {
		return object instanceof Array ? 'Array' : object
	}
});

template.events({
	'click li.expandable'(event, template) {
		event.stopPropagation()
		template.expand.set(!template.expand.get())
	}
})