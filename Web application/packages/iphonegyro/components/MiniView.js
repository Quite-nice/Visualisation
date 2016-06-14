/**
 * Created by Jeroen on 02/06/16.
 */

import './MiniView.html'
import './style.css'
import {Events} from 'meteor/database'
import {Template} from 'meteor/templating'

Template.iPhoneGyroView.onCreated(function (){
	const template = this;

	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('eventsSentByModule', module._id)
		}
	})
})

Template.iPhoneGyroView.onRendered(function() {
	const iPhoneRepresentation = this.find('.iphoneRepresentation');

	console.log(iPhoneRepresentation)

	Events.find({senderId: this.data.module._id, type: 'gyro'}).observeChanges({
		added(id, fields) {
			iPhoneRepresentation.style.transform = `rotateX(${-fields.payload[1]}rad) rotateY(${fields.payload[0]}rad) rotateZ(${-fields.payload[2]}rad)`
		}
	})
})