/**
 * Created by Jeroen on 02/06/16.
 */
import '/imports/ui/layouts/allModules.html'
import {GenericModule} from '/imports/ui/components/module/module'

import {Events} from '/imports/api/events/events'
import 'meteor/mock-github'

Template.allModules.helpers({
    getAllModules(){
        return Events.find()
    }
})
