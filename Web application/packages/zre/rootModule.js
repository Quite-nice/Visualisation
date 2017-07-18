import { Modules } from 'meteor/visualisation:database'

import { rootModuleType as type } from './meta'

Modules.upsert({type}, {$set: {
	parentId: null,
	name: 'ZRE network'
}})

export default Modules.findOne({type})