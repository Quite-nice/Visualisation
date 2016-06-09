/**
 * Created by Kymer on 1/06/16.
 */

//PACKAGES
import {FlowRouter} from 'meteor/kadira:flow-router'
import {BlazeLayout} from 'meteor/kadira:blaze-layout'
import {Menu} from 'meteor/devian:navigation'

//TEMPLATES
import '/imports/ui/pages/layout'
import '/imports/ui/pages/overview'
import '/imports/ui/components/location/map'

// set up all routes in the app
export const navigation = new Menu()

navigation.route('/', {
    name: 'Overview',
    action: function(){
        BlazeLayout.render('layout', {content: 'overview'})
    }
})

navigation.route('/geo', {
    name: 'Geo',
    action: function(){
        BlazeLayout.render('layout', {content: 'map'})
    }
})