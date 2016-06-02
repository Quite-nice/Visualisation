/**
 * Created by Jeroen on 02/06/16.
 */
import 'module.html'

import {Events} from '/imports/api/events/events'
import {Modules} from '/imports/api/modules/modules'

Template.GenericModule.onCreated(function (){
	Meteor.subscribe('eventsReceivedByModule', this._id)
})

Template.GenericModule.helpers({
	receivedEvents(){
		// best to filter on the sender, this way, shouts don't get excluded
		Events.find({sender: {$ne: this._id}})
	}
})

