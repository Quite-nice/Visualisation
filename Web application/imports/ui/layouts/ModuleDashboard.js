/**
 * Created by Jeroen on 02/06/16.
 */

import './ModuleDashboard.html';
import '/imports/ui/components/GenericModule/MiniView';
import '/imports/ui/components/GenericModule/DetailView';
import '/imports/api/modules/modules';

import {Modules} from '/imports/api/modules/modules'
import {Meteor} from 'meteor/meteor'

const template = Template.ModuleDashboard;

template.onCreated(function() {
	this.subscribe('subModulesFromModule', null);
});

template.helpers({
	getAllModules(){
		return Modules.find()
	}
});