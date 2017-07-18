import './whisper-detailViewPage.html'
import {whisperMethodName} from '../../meta'

console.log('whisper method name', whisperMethodName)

Template.ZreWhisperDetailViewPage.events({
	submit(event, template) {
		event.preventDefault()
		const whisperString = template.find('#whisperString').value
		Meteor.call(whisperMethodName, this.module._id, whisperString, function(error, result) {
			console.log(error, result)

		})
	}
})