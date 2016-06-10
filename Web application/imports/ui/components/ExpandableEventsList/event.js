/**
 * Created by Jeroen on 02/06/16.
 */

import './event.html'
import moment from 'moment'

Template.ExpandableEventsList.helpers({
	format(date) {
		return moment(date).format('HH:mm:ss.SSS')
	}
})