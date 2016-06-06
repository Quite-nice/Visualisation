/**
 * Created by Jeroen on 02/06/16.
 */
import '/imports/ui/layouts/allModules.html'
import {GenericModule} from '/imports/ui/components/module/module'

import {Modules} from '/imports/api/modules/modules'
import 'meteor/mock-github'

Module = Modules

Template.allModules.helpers({
    getAllModules(){
        return Modules.find()
    }
})
