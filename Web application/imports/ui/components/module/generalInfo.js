/**
 * Created by Jeroen on 03/06/16.
 */

import './generalInfo.html'
import {Modules} from '/imports/api/modules/modules'
import {Events} from '/imports/api/events/events'


Template.modulesGeneralInfo.helpers({
    totalNumberOfModules(){
        return Modules.find().count()
    },
    totalNumberOfEvents(){
        return Events.find().count()
    }
})
