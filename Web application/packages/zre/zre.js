import Zyre from 'zyre.js'
import {Events, Modules} from 'meteor/visualisation:database'

// Variables exported by this module can be imported by other packages and
// applications. See zre-tests.js for an example of importing.
export const name = 'zre'

const zreObserver = new Zyre({name: 'MeteorJS visualisation'});

Modules.upsert({type: 'ZRE network observer'}, {$set: {
	parentId: null,
	name: 'ZRE network'
}});