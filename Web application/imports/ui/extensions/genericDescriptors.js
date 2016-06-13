import {EventDescriptor} from './EventDescriptor';
import {ModuleDescriptor} from './ModuleDescriptor';

import '/imports/ui/components/GenericModule/DetailView'
import '/imports/ui/components/GenericModule/MiniView'
import '/imports/ui/components/Event/GenericEventLineView'
import '/imports/ui/components/JsonView/JsonView'

export const genericModuleDescriptor = new ModuleDescriptor({
	miniView: 'GenericModule',
	detailView: 'DetailView',
	detailPageViews: ['EventsDetailPage']
})

genericModuleDescriptor.registerEvent(function() {return true}, new EventDescriptor({
	detailView: 'JsonView',
	lineView: 'GenericEventLineView'
}))