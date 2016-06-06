/**
 * Created by Kymer on 1/06/16.
 */
import { Meteor } from 'meteor/meteor'
import { Modules } from '/imports/api/modules/modules'
import { Types } from '/imports/api/types/types'

// all modules-related publications
// publications are available with and without type information
// on the client you can selectively choose which publication is needed
Meteor.publish('allModules', function() {
	return Modules.find()
})

Meteor.publishComposite('allModulesWithType', {
	find: function () {
		return Modules.find()
	},
	children: [{
		find: function(module) {
			// this needs to be a find() and not findOne() as required
			// by the publish-composite package
			return Types.find({_id: module.typeId})
		}
	}]
})

Meteor.publish('module', function(id) {
	return Modules.find({_id: id})
})

Meteor.publishComposite('moduleWithType', function(id) {
	return {
		find: function () {
			return Modules.find({_id: id})
		},
		children : [{
			find: function (module) {
				// this needs to be a find() and not findOne() as required
				// by the publish-composite package
				return Types.find({_id: module.typeId})
			}
		}]
	}
})