/**
 * Created by Jeroen on 03/06/16.
 */

import './DetailView.html'
import {findModuleDescriptorField, getDetailPageName} from '/imports/ui/extensions/registry'

const template = Template.DetailView;

template.helpers({
	pages() {
		return findModuleDescriptorField(this.module, 'detailPageViews')
	},
	pageName(page) {
		return getDetailPageName(page)
	},
	selectedPage() {
		FlowRouter.watchPathChange()
		return FlowRouter.current().queryParams.page
	},
	isSelectedPage(page) {
		FlowRouter.watchPathChange()
		return FlowRouter.current().queryParams.page == page
	}
})

template.events({
	'click .nav-tabs>li'(event) {
		event.preventDefault();
		const context = FlowRouter.current();
		FlowRouter.go(context.route.pathDef, context.params, {page: String(this)})
	}
})