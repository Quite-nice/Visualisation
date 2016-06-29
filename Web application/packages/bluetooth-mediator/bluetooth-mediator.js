import {Modules, Events} from 'meteor/visualisation:database';

const noble = require('noble');

noble.on('stateChange', Meteor.bindEnvironment(function(state) {
	if (state === 'poweredOn') {
		noble.startScanning([], true);
	} else {
		noble.stopScanning();
		removeAllModules()
	}
}));

const deviceTimeouts = new Map();
const timeout = 1000;

removeAllModules();
noble.on('discover', Meteor.bindEnvironment(function(peripheral) {
	if (deviceTimeouts.has(peripheral.id)) {
		clearTimeout(deviceTimeouts.get(peripheral.id));
		deviceTimeouts.set(peripheral.id, Meteor.setTimeout(() => deleteTimeout(peripheral.id), timeout));
		Modules.update(peripheral.id, {
			$set: {name: peripheral.advertisement.localName}
		})
	} else {
		deviceTimeouts.set(peripheral.id, Meteor.setTimeout);

		const advertisement = peripheral.advertisement;
		Modules.insert({
			_id: peripheral.id,
			type: 'iPhone',
			name: advertisement.localName
		});

		peripheral.connect(Meteor.bindEnvironment(function(error) {
			peripheral.discoverServices(['cdd49cb83d1a11e6ac619e71128cae77'], Meteor.bindEnvironment(function(error, services) {
				for (service of services) {
					service.discoverCharacteristics(['b8d2aa983d1b11e6ac619e71128cae77'], Meteor.bindEnvironment(function(error, characteristics) {
						for (characteristic of characteristics) {
							characteristic.subscribe(function(error) {
								console.log('error', error)
							});
							characteristic.on('data', Meteor.bindEnvironment(function(data) {
								const event = {
									senderId: peripheral.id,
									type: 'gyro',
									payload: [data.readInt32LE(0)/100000000, data.readInt32LE(4)/100000000, data.readInt32LE(8)/100000000],
									date: new Date()
								};
								Events.insert(event);
							}))
						}
					}))
				}
			}))
		}))
	}
}));

function deleteTimeout(deviceID) {
	clearTimeout(deviceTimeouts.get(deviceID));
	deviceTimeouts.delete(deviceID);
	Modules.remove(deviceID)
}

function removeAllModules() {
	Modules.remove({type: 'bluetooth-device'})
}