/**
 * Created by Kymer on 1/06/16.
 */
import { Meteor } from 'meteor/meteor'
import {Modules} from '/imports/api/modules/modules'

// all modules-related publications

Meteor.publish('allModules', function() {
    return Modules.find()
})