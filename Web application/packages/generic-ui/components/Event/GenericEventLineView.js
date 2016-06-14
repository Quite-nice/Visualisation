import './GenericEventLineView.html'
import moment from 'moment'
import './StateEvent'

const template = Template.GenericEventLineView

template.helpers({
	format(date) {
		return moment(date).format('HH:mm:ss.SSS')
	}
})