﻿import {Modules, Events} from 'meteor/visualisation:database';

const noble = require('noble');

var bluetoothModuleId;
const bluetoothCursor = Modules.find({type: 'bluetooth'})
if (bluetoothCursor.count() > 0) {
	bluetoothModuleId = bluetoothCursor.fetch()[0]._id
} else {
	bluetoothModuleId = Modules.insert({type: 'bluetooth', name: 'Bluetooth LE'})
}

noble.on('stateChange', Meteor.bindEnvironment(function(state) {
	if (state === 'poweredOn') {
		noble.startScanning(['cdd49cb83d1a11e6ac619e71128cae77'], true);
		Events.insert({
			senderId: bluetoothModuleId,
			type: 'state',
			payload: 2,
			date: new Date()
		})
	} else {
		noble.stopScanning();
		removeAllModules()
		Events.insert({
			senderId: bluetoothModuleId,
			type: 'state',
			payload: 0,
			date: new Date()
		})
	}
}));

noble.on('scanStop', function() {
	if (noble.state === 'poweredOn') noble.startScanning(['cdd49cb83d1a11e6ac619e71128cae77'], true);
});

const devices = new Set()

removeAllModules();
noble.on('discover', Meteor.bindEnvironment(function(peripheral) {
	if (!devices.has(peripheral.id)) {
		devices.add(peripheral.id);
		const advertisement = peripheral.advertisement;

		peripheral.connect(Meteor.bindEnvironment(function(error) {

			Modules.insert({
				_id: peripheral.id,
				parentId: bluetoothModuleId,
				type: 'iPhone',
				name: advertisement.localName
			});

			peripheral.discoverServices(['cdd49cb83d1a11e6ac619e71128cae77'], Meteor.bindEnvironment(function(error, services) {
				for (service of services) {
					service.discoverCharacteristics(['b8d2aa983d1b11e6ac619e71128cae77'], Meteor.bindEnvironment(function(error, characteristics) {
						for (characteristic of characteristics) {
							characteristic.subscribe(function(error) {
								if (error) console.log('error', error)
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
			peripheral.once('disconnect', Meteor.bindEnvironment(function() {
				devices.delete(peripheral.id);
				Modules.remove(peripheral.id);
			}))
		}))
	}
}));

function removeAllModules() {
	Modules.remove({type: {$in: ['bluetooth-device', 'iPhone']}})
}