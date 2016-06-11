/**
 * Created by Jeroen on 02/06/16.
 */

import './ModuleDashboard.html';
import '/imports/ui/components/GenericModule/MiniView';
import '/imports/ui/components/GenericModule/DetailView';
import '/imports/api/modules/modules';

import {Modules} from '/imports/api/modules/modules'
import {Meteor} from 'meteor/meteor'
import {replaceSubscription} from "../subscriptionManagement";

const template = Template.ModuleDashboard;

template.onCreated(function() {
	let moduleSubscription = null;
	let subModulesSubscription = null;
	this.autorun(() => {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current();
		const root = context.route.name == "All modules";

		if (!root) {
			moduleSubscription = replaceSubscription(this, moduleSubscription, 'module', context.params.moduleId);
		}
		subModulesSubscription = replaceSubscription(this, subModulesSubscription, 'subModulesFromModule', root ? null : context.params.moduleId);
	})
});

template.helpers({
	module() {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current();
		if (context.route.name == "All modules") {
			return {
				name: 'All modules',
				subModuleCount: Modules.find({parentId: null}).count()
			}
		} else {
			const module = Modules.findOne(context.params.moduleId) || {}
			module.subModuleCount = Modules.find({parentId: context.params.moduleId}).count()
			return module
		}
	},
	subModules() {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current()
		const root = context.route.name == "All modules";
		return Modules.find({parentId: root ? null : context.params.moduleId})
	}
});
