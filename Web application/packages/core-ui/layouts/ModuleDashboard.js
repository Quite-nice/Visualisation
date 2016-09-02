/**
 * Created by Jeroen on 02/06/16.
 */

import './ModuleDashboard.html';
import './wrapping-fix.css'
import {findModuleDescriptorField} from 'meteor/visualisation:extension-system'

import {Events, Modules} from 'meteor/visualisation:database'
import {Meteor} from 'meteor/meteor'

const template = Template.ModuleDashboard;

template.onCreated(function() {
	this.autorun(() => {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current();
		const root = context.route.name == "All modules";

		if (!root) {
			this.subscribe('module', context.params.moduleId);
		}
		this.subscribe('subModulesFromModule', root ? null : context.params.moduleId);
	})
});

template.helpers({
	rootModule() {
		return {
			name: 'All modules',
			subModuleCount: Modules.find({parentId: null}).count()
		}
	},
	module() {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current();
		const module = Modules.findOne(context.params.moduleId) || {}
		module.subModuleCount = Modules.find({parentId: context.params.moduleId}).count()
		return module
	},
	subModules() {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current()
		const root = context.route.name == "All modules";
		return Modules.find({parentId: root ? null : context.params.moduleId})
	},
	miniView(module) {
		return findModuleDescriptorField(module, 'miniView')
	},
	miniViewData(module) {
		return {module}
	},

	//Breadcrumbs
	root() {
		FlowRouter.watchPathChange();
		return FlowRouter.current().route.name == "All modules";
	},
	breadcrumbs() {
		FlowRouter.watchPathChange();
		let breadcrumbs = [];
		if (Modules.find(FlowRouter.current().params.moduleId).count() > 0) {
			const currentModule = Modules.findOne(FlowRouter.current().params.moduleId);
			let parentModule = Modules.findOne(currentModule.parentId);
			while (parentModule != undefined && parentModule._id != null) {
				breadcrumbs.push(parentModule);
				parentModule = Modules.findOne(parentModule.parentId);
			}
		}
		return breadcrumbs.reverse()
	}
});
