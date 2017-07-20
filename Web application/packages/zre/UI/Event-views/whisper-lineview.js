import { Template } from 'meteor/templating'
import './whisper-lineview.html'

Template.ZreWhisperLineView.helpers({
	trim(string) {
		if (string.length > 17) {
			return string.slice(0, 17) + '...'
		} else {
			return string
		}
	}
})