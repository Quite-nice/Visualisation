import {typeId1, type1, typeId2, type2, typeId3, type3} from './types'

export const branchesId = new Mongo.ObjectID()
export const branches = {
	type: typeId1,
	name: 'Branches',
	parent: null
};

export const issuesId = new Mongo.ObjectID()
export const issues = {
	type: typeId2,
	name: 'Issues',
	parent: null
};

export const pullRequestsId = new Mongo.ObjectID()
export const pullRequests = {
	type: typeId3,
	name: 'Pull requests',
	parent: null
};
