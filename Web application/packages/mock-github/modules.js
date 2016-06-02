export const branchesId = new Mongo.ObjectID()
export const branches = {
	type: 'collection',
	name: 'Branches',
	parent: null
};

export const issuesId = new Mongo.ObjectID()
export const issues = {
	type: 'collection',
	name: 'Issues',
	parent: null
};

export const pullRequestsId = new Mongo.ObjectID()
export const pullRequests = {
	type: 'collection',
	name: 'Pull requests',
	parent: null
};
