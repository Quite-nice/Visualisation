import {ModuleDescriptor, EventDescriptor, registerModuleDescriptor, registerDetailPageName} from 'meteor/visualisation:extension-system'

import './Event-views/shout-lineview'
import './Module-views/whisper-detailViewPage'
import './Module-views/shout-detailViewPage'
import './Module-views/meta-detailViewPage'
import { zreModuleType, rootModuleType } from '../meta'

registerDetailPageName('Whisper', 'ZreWhisperDetailViewPage')
registerDetailPageName('Module information', 'ZreMetaDetailViewPage')
const zreModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer', 'ZreWhisperDetailViewPage', 'ZreMetaDetailViewPage']
})

const shoutEventDescriptor = new EventDescriptor({
	lineView: 'ZreShoutLineView'
})

registerModuleDescriptor(zreModuleType, zreModuleDescriptor)
zreModuleDescriptor.registerEvent('shout', shoutEventDescriptor)

registerDetailPageName('Shout', 'ZreShoutDetailViewPage')
const rootModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer', 'ZreShoutDetailViewPage']
})

registerModuleDescriptor(rootModuleType, rootModuleDescriptor)
rootModuleDescriptor.registerEvent('shout', shoutEventDescriptor)