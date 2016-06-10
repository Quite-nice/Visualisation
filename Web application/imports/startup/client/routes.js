/**
 * Created by Kymer on 1/06/16.
 */

//PACKAGES
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {Menu} from 'meteor/devian:navigation';


// //TEMPLATES
import '../../ui/layouts/ModuleDashboard'
import '../../ui/pages/BasicPage'

// set up all routes in the app
export const navigation = new Menu();

navigation.route('/', {
	name: 'Overview',
	action: function(){
		BlazeLayout.render('BasicPage', {content: 'ModuleDashboard'})
	}
});