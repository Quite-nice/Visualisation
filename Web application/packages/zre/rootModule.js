import { Modules } from 'meteor/visualisation:database'

const type = 'ZRE network observer'

Modules.upsert({type}, {$set: {
	parentId: null,
	name: 'ZRE network'
}})

export default Modules.findOne({type})