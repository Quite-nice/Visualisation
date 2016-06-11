/**
 * Created by Jeroen on 03/06/16.
 */

import './DetailView.html'
import {Modules} from '/imports/api/modules/modules'
import {Events} from '/imports/api/events/events'

const template = Template.DetailView;

template.onCreated(function () {
    this.autorun(() => {
        const data = Template.currentData();
    })
});

template.helpers({
    totalNumberOfModules(){
        return Modules.find().count()
    },
    totalNumberOfEvents(){
        return Events.find().count()
    }
});