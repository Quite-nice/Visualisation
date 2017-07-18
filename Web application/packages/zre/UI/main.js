import {ModuleDescriptor, EventDescriptor, registerModuleDescriptor, registerDetailPageName} from 'meteor/visualisation:extension-system'

import './Event-views/shout-lineview'
import './Module-views/whisper-detailViewPage'
import './Module-views/meta-detailViewPage'
import { zreModuleType } from '../meta'

const zreModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer', 'ZreWhisperDetailViewPage', 'ZreMetaDetailViewPage']
})

const shoutEventDescriptor = new EventDescriptor({
	lineView: 'ZreShoutLineView'
})

registerModuleDescriptor(zreModuleType, zreModuleDescriptor)
zreModuleDescriptor.registerEvent('shout', shoutEventDescriptor)

registerDetailPageName('Whisper', 'ZreWhisperDetailViewPage')
registerDetailPageName('Module information', 'ZreMetaDetailViewPage')