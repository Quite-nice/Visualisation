import './GenericEventLineView.html'
import moment from 'moment'

Template.registerHelper('timestampForLoggingFrom', function(date) {
	return moment(date).format('HH:mm:ss.SSS')
})