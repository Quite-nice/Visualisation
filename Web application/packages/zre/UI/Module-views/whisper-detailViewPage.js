import './whisper-detailViewPage.html'
import {whisperMethodName} from '../../meta'

Template.ZreWhisperDetailViewPage.events({
	submit(event, template) {
		event.preventDefault()
		const whisperString = template.find('#whisperString').value
		Meteor.call(whisperMethodName, this.module._id, whisperString)
	}
})