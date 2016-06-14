/**
 * Created by Kymer on 1/06/16.
 */
import { Meteor } from 'meteor/meteor'
import { Modules } from '/imports/api/modules/modules'
import { Events } from '/imports/api/events/events'
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
	Modules.find({_id: id})._publishCursor(this);
	publishModuleState(id, this);
	publishSubModuleCount(id, this);
	publishAncestorNames(id, this)
	this.ready();
})

function publishAncestorNames(moduleId, publication) {
	const ancestors = [];
	let parentId = parentIdOf(moduleId);
	while (parentId != null) {
		ancestors.push(parentId)
		parentId = parentIdOf(parentId)
	}
	Modules.find({_id: {$in: ancestors}}, {fields: {name: 1}})._publishCursor(publication);
}

function parentIdOf(moduleId) {
	const module = Modules.findOne({_id: moduleId}, {fields: {parentId: 1}});
	if (module == undefined) {
		return null
	} else {
		return module.parentId
	}
}

function publishModuleState(moduleId, publication) {
	if (moduleId != null) {
		const observer = Events.find({
			senderId: moduleId,
			type: 'state'
		}, {
			sort: {date: -1},
			limit: 1
		}).observeChanges({
			added(id, fields) {
				publication.changed('modules', moduleId, {state: fields.payload})
			}
		})

		publication.onStop(function() {observer.stop()})

		return observer
	}
	return null
}

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
	const publication = this;
	const moduleStateObservers = new Map()
	const subModuleCountObservers = new Map()
	const observer = Modules.find({parentId: id}).observeChanges({
		added(id, fields) {
			publication.added('modules', id, fields);
			moduleStateObservers.set(id, publishModuleState(id, publication));
			subModuleCountObservers.set(id, publishSubModuleCount(id, publication));
		},
		changed(id, fields) { publication.changed('modules', id, fields) },
		removed(id) {
			publication.removed('modules', id)
			moduleStateObservers.get(id).stop()
			subModuleCountObservers.get(id).stop()
		}
	});

	publication.onStop(function() {
		observer.stop();
	})
})

function publishSubModuleCount(parentId, publication) {
	let count = 0

	publication.changed('modules', parentId, {subModuleCount: count})
	const observer = Modules.find({parentId}).observeChanges({
		added() {
			count = count+1
			publication.changed('modules', parentId, {subModuleCount: count})
		},
		removed() {
			count = count - 1
			publication.changed('modules', parentId, {subModuleCount: count})
		}
	})

	publication.onStop(function() {
		observer.stop()
	})

	return observer
}

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