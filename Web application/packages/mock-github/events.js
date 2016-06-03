import {branchesId} from './modules'

export const events = [
	{
		senderId: branchesId,
		date: new Date(),
		type: 'commit',
		payload: {
			hash: 'ab65',
			author: 'Damiaan',
			message: 'init'
		}
	}, {
		senderId: branchesId,
		date: new Date(),
		type: 'commit',
		payload: {
			hash: 'ab69',
			author: 'Jeroen',
			message: 'add spul'
		}
	}, {
		senderId: branchesId,
		date: new Date(),
		type: 'commit',
		payload: {
			hash: 'ab35',
			author: 'Kymer',
			message: 'add ding'
		}
	}
];