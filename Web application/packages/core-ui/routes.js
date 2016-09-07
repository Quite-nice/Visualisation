/**
 * Created by Kymer on 1/06/16.
 */

//PACKAGES
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Menu} from 'meteor/devian:navigation';
import {FlowRouter} from 'meteor/kadira:flow-router'


// //TEMPLATES
import './layouts/ModuleDashboard'
import './pages/BasicPage'

// set up all routes in the app
export const navigation = new Menu();

navigation.route('/', {
	name: 'All modules',
	action() {
		BlazeLayout.render('BasicPage', {content: 'ModuleDashboard'})
	}
});

FlowRouter.route('/module/:moduleId', {
	name: 'Module',
	action() {
		BlazeLayout.render('BasicPage', {content: 'ModuleDashboard'})
	}
});