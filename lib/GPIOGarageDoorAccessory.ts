/**
 * Created by kraig on 7/2/16.
 */

import util = require("util");
import Promise = require("bluebird");
import GPIO = require("onoff");
import {getCurrentDoorStateDescription} from "./DoorStateExtension";
import {changeBase} from "./Runtime";
import DoorSensorPort from "./DoorSensorPort";

var Accessory, Service, Characteristic, uuid;

export default class GPIOGarageDoorAccessory {
	private log;
	private name: string;
	private doorSensor: DoorSensorPort;

	// Base class methods
	private addService: (any) => any;
	private getService: (any) => any;
	private services: any[];
	private uuid_base: string;

	static init(exportTypes) {
		Accessory = exportTypes.Accessory;
		Service = exportTypes.Service;
		Characteristic = exportTypes.Characteristic;
		uuid = exportTypes.uuid;
		changeBase(GPIOGarageDoorAccessory, Accessory);
	}

	constructor(log, config) {
		var name = config["name"];
		var id = uuid.generate('gpio-doorsensor.' + (config['id'] || this.name));
		Accessory.call(this, name, id);
		this.uuid_base = id;
		this.name = name;
		this.log = log;

		var garageDoorOpener = this.addService(Service.GarageDoorOpener);

		var doorSensorPin = config["doorSensorPin"];
		log("Door Sensor Pin: " + doorSensorPin);
		if (doorSensorPin) {
			var isNCSensor = config['isNCSensor'] == true;
			log("Is NC Sensor: " + isNCSensor);
			this.doorSensor = new DoorSensorPort(doorSensorPin, garageDoorOpener, log, isNCSensor);
		}
	}

	getServices(): any {
		return this.services;
	};
}
