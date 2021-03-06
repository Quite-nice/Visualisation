import '../Event/EventLineView'
import '../JsonView/JsonView'
import './expandableEvent.html'

import {ReactiveVar} from 'meteor/reactive-var'

const template = Template.ExpandableEventItem

template.onCreated(function() {
	this.expand = new ReactiveVar(false)
})

template.helpers({
	expand() {
		return Template.instance().expand.get()
	}
})

template.events({
	'click .js-item'(event, template) {
		template.expand.set(!template.expand.get())
	}
})