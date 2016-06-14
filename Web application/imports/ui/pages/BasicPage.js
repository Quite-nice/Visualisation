/**
 * Created by Jeroen on 03/06/16.
 */

import './BasicPage.html'
import '/imports/ui/components/menu/menu'

import { navigation } from '/imports/startup/client/routes'

Template.BasicPage.helpers({
    navigation(){
        return navigation
    }
});