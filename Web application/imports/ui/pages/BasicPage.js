/**
 * Created by Jeroen on 03/06/16.
 */

import '../style.css'
import './BasicPage.html'
import '/imports/ui/components/Menu/menu'

import { navigation } from '/imports/startup/client/routes'

Template.BasicPage.helpers({
    navigation(){
        return navigation
    }
});