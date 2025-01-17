/// <reference path="./typings/globals/node/index.d.ts" />

import DoorSensorPort from "./lib/DoorSensorPort";
import GPIOGarageDoorAccessory from "./lib/GPIOGarageDoorAccessory";
import DoorStateExtension from "./lib/DoorStateExtension";

module.exports = function (homebridge) {
  var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

  DoorStateExtension.init(exportTypes);
  DoorSensorPort.init(exportTypes);
  GPIOGarageDoorAccessory.init(exportTypes);

  homebridge.registerAccessory("homebridge-gpio-doorSensor", "GPIODoorSensor", GPIOGarageDoorAccessory);
};
