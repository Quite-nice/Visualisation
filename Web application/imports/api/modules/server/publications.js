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

Meteor.publishComposite('allModulesPlusType', {
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

Meteor.publishComposite('modulePlusType', function(id) {
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


Meteor.publish('subModulesFromModule', function(id) {
	return Modules.find({parentId: id})
})

Meteor.publish('subModuleCount', function(parentId) {
	let count = 0
	const publication = this

	const observer = Modules.find({parentId}).observeChanges({
		added() {
			publication.changed('modules', parentId, {subModuleCount: ++count})
		},
		removed() {
			publication.changed('modules', parentId, {subModuleCount: --count})
		}
	})

	this.onStop(function() {observer.stop()})

	this.ready()
})

Meteor.publishComposite('subModulesFromModulePlusType', function(id) {
	return {
		find: function () {
			return Modules.find({parentId: id})
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


Meteor.publish('modulesFromLocation', function(lat, long, radiusInMeter) {
	return Modules.find({
		$near: {
			$geometry: {type: 'Point', coordinates: [long, lat]}
		},  $maxDistance: radiusInMeter
	})
})

Meteor.publishComposite('modulesFromLocationPlusType', function(lat, long, radiusInMeter) {
	return {
		find: function () {
			return Modules.find({
				$near: {
					$geometry: {type: 'Point', coordinates: [long, lat]}
				},  $maxDistance: radiusInMeter
			})
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