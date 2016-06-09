import './discovery'
import { Events, Modules} from 'meteor/database'

const upsert = Modules.upsert({type: 'websocket-mediator'}, {$set: {
	parentId: null,
	name: 'Websocket mediator'
}});

console.log(upsert);