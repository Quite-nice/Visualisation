import {ModuleDescriptor} from 'meteor/visualisation:extension-system'
import {EventDescriptor} from 'meteor/visualisation:extension-system'
import {registerModuleDescriptor} from 'meteor/visualisation:extension-system'

import './shout lineview'
import { zreModuleType } from '../meta'

const zreModuleDescriptor = new ModuleDescriptor({
	detailPageViews: ['EventDetailPageContainer']
})

const shoutEventDescriptor = new EventDescriptor({
	lineView: 'ZreShoutLineView'
})

registerModuleDescriptor(zreModuleType, zreModuleDescriptor)

zreModuleDescriptor.registerEvent('shout', shoutEventDescriptor)
