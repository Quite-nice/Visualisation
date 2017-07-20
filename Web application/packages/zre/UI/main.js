import {ModuleDescriptor, EventDescriptor, registerModuleDescriptor, registerDetailPageName} from 'meteor/visualisation:extension-system'

import './Event-views/shout-lineview'
import './Event-views/whisper-lineview'
import './Module-views/whisper-detailViewPage'
import './Module-views/shout-detailViewPage'
import './Module-views/meta-detailViewPage'
import './Module-views/graph-detailViewPage'
import { zreModuleType, rootModuleType } from '../meta'
export * from '../meta'

registerDetailPageName('Whisper', 'ZreWhisperDetailViewPage')
registerDetailPageName('Module information', 'ZreMetaDetailViewPage')
const zreModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer', 'ZreWhisperDetailViewPage', 'ZreMetaDetailViewPage']
})

const shoutEventDescriptor = new EventDescriptor({lineView: 'ZreShoutLineView'})
const whisperEventDescriptor = new EventDescriptor({lineView: 'ZreWhisperLineView'})

registerModuleDescriptor(zreModuleType, zreModuleDescriptor)
zreModuleDescriptor.registerEvent('shout', shoutEventDescriptor)
zreModuleDescriptor.registerEvent('whisper', whisperEventDescriptor)

registerDetailPageName('Shout', 'ZreShoutDetailViewPage')
registerDetailPageName('Submodules graph', 'SubmodulesForceGraphDetailViewPage')
const rootModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer', 'ZreShoutDetailViewPage', 'SubmodulesForceGraphDetailViewPage']
})

registerModuleDescriptor(rootModuleType, rootModuleDescriptor)
rootModuleDescriptor.registerEvent('shout', shoutEventDescriptor)