/**
 * Created by Jeroen on 03/06/16.
 */

export const branchTypeId = new Mongo.ObjectID()
export const branchType = {
    name: 'Branch',
    color: '#c0c0c0',
    discription: 'github branch'
}

export const contributorTypeId = new Mongo.ObjectID()
export const contributorType = {
    name: 'contributor',
    color: '#f0f0f0',
    discription: 'github contributor'
}

export const issueTypeId = new Mongo.ObjectID()
export const issueType = {
    name: 'Issue',
    color: '#020202',
    discription: 'github issue'
}

export const pullRequestTypeId = new Mongo.ObjectID()
export const pullRequestType = {
    name: 'Pull Request',
    color: '#034034',
    discription: 'github pull request'
}