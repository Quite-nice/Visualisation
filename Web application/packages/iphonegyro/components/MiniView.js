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
			iPhoneRepresentation.style.transform = `rotateX(${fields.payload[0]}rad) rotateY(${fields.payload[1]}rad) rotateZ(${fields.payload[2]}rad)`
		}
	})
})

function quatToMatrix([x, y, z, w]){
	const sqw = w*w;
	const sqx = x*x;
	const sqy = y*y;
	const sqz = z*z;

	const m00 = ( sqx - sqy - sqz + sqw);
	const m11 = (-sqx + sqy - sqz + sqw);
	const m22 = (-sqx - sqy + sqz + sqw);

	let tmp1 = x*y;
	let tmp2 = z*w;
	const m10 = 2.0 * (tmp1 + tmp2) ;
	const m01 = 2.0 * (tmp1 - tmp2) ;

	tmp1 = x*z;
	tmp2 = y*w;
	const m20 = 2.0 * (tmp1 - tmp2) ;
	const m02 = 2.0 * (tmp1 + tmp2) ;
	tmp1 = y*z;
	tmp2 = x*w;
	const m21 = 2.0 * (tmp1 + tmp2) ;
	const m12 = 2.0 * (tmp1 - tmp2) ;

	return `${m00}, ${m01}, ${m02}, 0, ${m10}, ${m11}, ${m12}, 0, ${m20}, ${m21}, ${m22}, 0, 0, 0, 0, 1`
}