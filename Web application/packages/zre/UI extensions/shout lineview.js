import { Template } from 'meteor/templating'
import './shout lineview.html'

Template.ZreShoutLineView.helpers({
	trim(string) {
		if (string.length > 17) {
			return string.slice(0, 17) + '...'
		} else {
			return string
		}
	}
})