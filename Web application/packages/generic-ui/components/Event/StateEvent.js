import './StateEvent.html'
import moment from 'moment'

const template = Template.StateEventLineView

template.helpers({
	format(date) {
		return moment(date).format('HH:mm:ss.SSS')
	}
})