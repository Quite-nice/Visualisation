/**
 * Created by Kymer on 1/06/16.
 */

export const Modules = new Mongo.Collection('modules')

// add Geospatial index so we can query it
Modules._ensureIndex({'loc.coordinates':'2dsphere'});