import './graph-detailViewPage.html'
import './graph-detailViewPage.css'
import {Modules, Events} from 'meteor/visualisation:database'

Template.SubmodulesForceGraphDetailViewPage.helpers({
	allModules() {
		return Modules.find({parentId: this.module._id, state: 2})
	},

	allEvents() {
		return Events.find({
			date: {$gt: new Date()},
			type: 'shout'
		})
	}
})