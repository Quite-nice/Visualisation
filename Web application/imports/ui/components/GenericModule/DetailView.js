/**
 * Created by Jeroen on 03/06/16.
 */

import './DetailView.html'
<<<<<<< Updated upstream
import {Modules} from '/imports/api/modules/modules'
import {Events} from '/imports/api/events/events'

import '/imports/ui/components/JsonView/JsonView'
=======
import {findModuleDescriptorField, getDetailPageName} from '/imports/ui/extensions/registry'
>>>>>>> Stashed changes

const template = Template.DetailView;

template.helpers({
<<<<<<< Updated upstream
    totalNumberOfModules(){
        return Modules.find().count()
    },
    totalNumberOfEvents(){
        return Events.find().count()
    }
});
=======
	pages() {
		return findModuleDescriptorField(this.module, 'detailPageViews')
	},
	pageName(page) {
		console.log(page)
		return getDetailPageName(page)
	}
})
>>>>>>> Stashed changes
