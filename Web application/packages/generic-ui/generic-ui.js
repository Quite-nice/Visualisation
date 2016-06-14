import {EventDescriptor, ModuleDescriptor, registerModuleDescriptor} from 'meteor/extension-system';

import './components/GenericModule/DetailView'
import './components/GenericModule/MiniView'
import './components/Event/GenericEventLineView'
import './components/JsonView/JsonView'
import './components/EventDetailPage/main'

export const genericModuleDescriptor = new ModuleDescriptor({
	miniView: 'GenericModule',
	detailView: 'DetailView',
	detailPageViews: ['EventDetailPage']
})

const genericEventDescriptor = new EventDescriptor({
	detailView: 'JsonView',
	lineView: 'GenericEventLineView'
})

genericModuleDescriptor.registerEvent(function() {return true}, genericEventDescriptor)
genericModuleDescriptor.registerEvent('state', new EventDescriptor({
	lineView: 'StateEventLineView'
}))

registerModuleDescriptor(function() {return true}, genericModuleDescriptor)