/**
 * Created by Jeroen on 02/06/16.
 */

import './ModuleDashboard.html';
import '/imports/ui/components/GenericModule/module';
import '/imports/ui/components/GenericModule/generalInfo';
import '/imports/api/modules/modules';

import {Modules} from '/imports/api/modules/modules'

Template.ModuleDashboard.helpers({
	getAllModules(){
		return Modules.find()
	}
});