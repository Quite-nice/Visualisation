/**
 * Created by Kymer on 1/06/16.
 */
import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'

export const Modules = new Mongo.Collection('modules')

// add Geospatial index so we can query it
if(Meteor.isServer) {
	Modules._ensureIndex({'loc.coordinates':'2dsphere'});
}