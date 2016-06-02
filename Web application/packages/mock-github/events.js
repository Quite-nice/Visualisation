import {branchesId} from './modules'

export const events = [
	{
		senderId: branchesId,
		type: 'commit',

		hash: 'ab65',
		author: 'Damiaan',
		message: 'init',
		date: new Date()
	}, {
		senderId: branchesId,
		type: 'commit',

		hash: 'ab69',
		author: 'Jeroen',
		message: 'add spul',
		date: new Date()
	}, {
		senderId: branchesId,
		type: 'commit',

		hash: 'ab35',
		author: 'Kymer',
		message: 'add ding',
		date: new Date()
	}
];