/**
 * Created by Jeroen on 07/06/16.
 */

import './menu.html'


Template.Menu.events({
    'click .route': function(event){
        event.preventDefault()
        event.stopPropagation()
        this.visit()
    }
})