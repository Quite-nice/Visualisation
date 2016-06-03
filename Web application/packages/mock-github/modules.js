export const branchesId = new Mongo.ObjectID()
export const branches = {
	type: 'collection',
	name: 'Branches',
	parentId: null
};

export const issuesId = new Mongo.ObjectID()
export const issues = {
	type: 'collection',
	name: 'Issues',
	parentId: null
};

export const pullRequestsId = new Mongo.ObjectID()
export const pullRequests = {
	type: 'collection',
	name: 'Pull requests',
	parentId: null
};
