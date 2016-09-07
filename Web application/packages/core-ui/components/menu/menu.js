/**
 * Created by Jeroen on 07/06/16.
 */

import './menu.html'
import {Template} from 'meteor/templating'

Template.Menu.events({
    'click .route': function(event){
        this.visit()
    }
});

export const menuReference = {element: null};

Template.Menu.onRendered(function() {
    menuReference.element = this.find('nav');
});