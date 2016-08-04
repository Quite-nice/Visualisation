/**
 * Created by Jeroen on 02/06/16.
 */

import './MiniView.html'
import './style.less'
import {iPhoneGyroscope} from '../publication'
import {Template} from 'meteor/templating'
import '../publication'

Template.iPhoneGyroView.onCreated(function (){
	const template = this;
	this.autorun(function() {
		const module = Template.currentData().module
		if (module != undefined) {
			template.subscribe('iPhoneGyroscope', module._id)
		}
	})
})

Template.iPhoneGyroView.helpers({
	iPhone() {
		return iPhoneGyroscope.findOne(this.module._id)
	}
})