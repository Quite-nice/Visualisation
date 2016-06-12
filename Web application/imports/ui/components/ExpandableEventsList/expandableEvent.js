import './expandableEvent.html'
import moment from 'moment'
import {ReactiveVar} from 'meteor/reactive-var'

const template = Template.ExpandableEventItem

template.onCreated(function() {
	this.expand = new ReactiveVar(false)
})

template.helpers({
	expand() {
		return Template.instance().expand.get()
	},
	format(date) {
		return moment(date).format('HH:mm:ss.SSS')
	}
})

template.events({
	'click .js-item'(event, template) {
		template.expand.set(!template.expand.get())
	}
})