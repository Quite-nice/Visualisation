import {Events} from 'meteor/visualisation:database'
import {Mongo} from 'meteor/mongo'
export const iPhoneGyroscope = new Mongo.Collection('iPhoneGyroscope');

if (Meteor.isServer) {
	Meteor.publish('iPhoneGyroscope', function(iPhoneId) {
		let init = true;
		const subscription = this;
		Events.find({
			senderId: iPhoneId,
			type:'gyro'
		}, {
			sort: {date: -1},
			fields: {payload: 1},
			limit: 1
		}).observeChanges({
			added(id, fields) {
				const gyro = { gyro: fields.payload };
				if (init) {
					init = false;
					subscription.added('iPhoneGyroscope', iPhoneId, gyro)
				} else {
					subscription.changed('iPhoneGyroscope', iPhoneId, gyro)
				}
			}
		})
		
		this.ready()
	})
}