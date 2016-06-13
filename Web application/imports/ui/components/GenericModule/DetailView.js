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
		console.log(page)
		return getDetailPageName(page)
	}
})