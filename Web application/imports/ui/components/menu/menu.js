/**
 * Created by Jeroen on 07/06/16.
 */

import './menu.html'

Template.menu.events({
    'click .route': function(event){
        event.stopPropagination()
        this.visit()
    }
})