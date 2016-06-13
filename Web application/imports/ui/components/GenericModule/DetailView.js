/**
 * Created by Jeroen on 03/06/16.
 */

import './DetailView.html'
import '../SelectableEventsList/eventList'

const template = Template.DetailView;

template.helpers({
	events: [
		{type: 'Hello', date: new Date()},
		{type: 'World', date: new Date()}
	]
})