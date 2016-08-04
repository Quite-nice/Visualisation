/**
 * Created by Jeroen on 03/06/16.
 */

import './DetailView.html'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { ReactiveVar } from 'meteor/reactive-var'
import {findModuleDescriptorField, getDetailPageName} from 'meteor/visualisation:extension-system'

const template = Template.DetailView;

template.onCreated(function() {
	this.detailPageViews = new ReactiveVar();
	this.autorun(() => {
		this.detailPageViews.set(findModuleDescriptorField(Template.currentData().module, 'detailPageViews'))
	})
});

template.helpers({
	pages() {
		return Template.instance().detailPageViews.get()
	},
	pageName(page) {
		return getDetailPageName(page)
	},
	selectedPage() {
		FlowRouter.watchPathChange();
		return FlowRouter.current().queryParams.page || Template.instance().detailPageViews.get()[0]
	},
	isSelectedPage(page) {
		FlowRouter.watchPathChange();
		if (FlowRouter.current().queryParams.page) {
			return FlowRouter.current().queryParams.page == page
		} else {
			return Template.instance().detailPageViews.get()[0] == page
		}
	}
});

template.events({
	'click .nav-tabs>li'(event) {
		event.preventDefault();
		const context = FlowRouter.current();
		FlowRouter.go(context.route.pathDef, context.params, {page: String(this)})
	}
})