import {branchTypeId, contributorTypeId, issueTypeId, pullRequestTypeId} from './types'

export const branchesId = new Mongo.ObjectID()
export const branches = {
	type: branchTypeId,
	name: 'Branches',
	parentId: null
};

export const issuesId = new Mongo.ObjectID()
export const issues = {
	type: issueTypeId,
	name: 'Issues',
	parentId: null
};

export const pullRequestsId = new Mongo.ObjectID()
export const pullRequests = {
	type: pullRequestTypeId,
	name: 'Pull requests',
	parentId: null
};
