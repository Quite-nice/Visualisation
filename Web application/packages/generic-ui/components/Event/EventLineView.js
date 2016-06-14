import './EventLineView.html'
import {findEventDescriptorField} from 'meteor/extension-system'

Template.EventLineView.helpers({
	lineView() {
		return findEventDescriptorField(this.event, this.module, 'lineView')
	}
})