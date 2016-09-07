/**
 * Created by Jeroen on 02/06/16.
 */

import './ModuleDashboard.html';
import './style.css'
import {menuReference} from '../components/menu/menu'
import {findModuleDescriptorField} from 'meteor/visualisation:extension-system'
import {ReactiveVar} from 'meteor/reactive-var'

import {Events, Modules} from 'meteor/visualisation:database'
import {Meteor} from 'meteor/meteor'

const template = Template.ModuleDashboard;
export const highlightedModules = new ReactiveVar([]);

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
		const module = Modules.findOne(context.params.moduleId) || {};
		module.subModuleCount = Modules.find({parentId: context.params.moduleId}).count();
		return module
	},
	subModules() {
		FlowRouter.watchPathChange();
		const context = FlowRouter.current();
		const root = context.route.name == "All modules";
		return Modules.find({parentId: root ? null : context.params.moduleId}, {sort: {name: 1}})
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

Template.SubModuleColumn.helpers({
	miniView() {
		return findModuleDescriptorField(this.module, 'miniView')
	},
	miniViewData() {
		return {module: this.module}
	},
	highlighted() {
		return highlightedModules.get().indexOf(this.module._id) != -1
	}
});

export const moduleScrollHandles = new Map();

Template.SubModuleColumn.onRendered(function() {
	const column = this.$('div.col-sm-4');
	function scrollToColumn() {
		$('html, body').animate({scrollTop: column.offset().top - menuReference.element.clientHeight - 20}, 500);
	}

	this.autorun(() => {
		const module = Template.currentData().module;
		moduleScrollHandles.set(module._id, scrollToColumn)
	});
});

Template.SubModuleColumn.onDestroyed(function() {
	moduleScrollHandles.clear()
});