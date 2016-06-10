/**
 * Created by Jeroen on 03/06/16.
 */

import './layout.html'
import '../style.css'
import {menu} from '/imports/ui/components/menu/menu'
import {navigation} from '/imports/startup/client/routes'

Template.layout.helpers({
    navigation(){
        return navigation
    }
})
