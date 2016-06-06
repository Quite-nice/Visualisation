/**
 * Created by Kymer on 1/06/16.
 */

//PACKAGES
import {FlowRouter} from 'meteor/kadira:flow-router'
import {BlazeLayout} from 'meteor/kadira:blaze-layout'

//TEMPLATES
import '/imports/ui/layouts/allModules'
import '/imports/ui/pages/overview'

// set up all routes in the app

FlowRouter.route('/', {
    name: 'home',
    action: function(){
        BlazeLayout.render('overview', {content: 'allModules'})
    }
})