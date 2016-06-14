import {EventDescriptor, ModuleDescriptor, registerModuleDescriptor} from 'meteor/visualisation:extension-system';

import './components/GenericModule/DetailView'
import './components/GenericModule/MiniView'
import './components/JsonView/JsonView'
import './components/Event/GenericEventLineView'
import './components/Event/StateEvent'
import './components/EventDetailPage/main'
import './style.less'

export const genericModuleDescriptor = new ModuleDescriptor({
	miniView: 'GenericModule',
	detailView: 'DetailView',
	detailPageViews: ['EventDetailPage']
})

const genericEventDescriptor = new EventDescriptor({
	detailView: 'JsonView',
	lineView: 'GenericEventLineView'
})

const stateEventDescriptor = new EventDescriptor({
	lineView: 'StateEventLineView'
})

genericModuleDescriptor.registerEvent(function() {return true}, genericEventDescriptor)
genericModuleDescriptor.registerEvent('state', stateEventDescriptor)

registerModuleDescriptor(function() {return true}, genericModuleDescriptor)