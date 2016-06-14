import './EventLineView.html'
import {findEventDescriptorField} from '/imports/ui/extensions/registry'

Template.EventLineView.helpers({
	lineView() {
		return findEventDescriptorField(this.event, this.module, 'lineView')
	}
})