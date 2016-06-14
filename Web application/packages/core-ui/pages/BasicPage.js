/**
 * Created by Jeroen on 03/06/16.
 */

import './BasicPage.html'
import '../components/menu/menu'

import { navigation } from '../routes'

Template.BasicPage.helpers({
    navigation(){
        return navigation
    }
});