import './shout-detailViewPage.html'
import {shoutMethodName} from '../../meta'

Template.ZreShoutDetailViewPage.events({
	submit(event, template) {
		event.preventDefault()
		const groupName = template.find('#group-name').value
		const message = template.find('#shout-string').value
		Meteor.call(shoutMethodName, groupName, message)
	}
})