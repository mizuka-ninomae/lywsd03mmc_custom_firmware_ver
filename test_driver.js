const Lywsd03mmc  = require('lywsd03mmc');
let  blu_mac      = "XX:XX:XX:XX:XX:XX";
let  ble_ctl_path = "/home/pi/homebridge-sensor/node_modules/lywsd03mmc_custom_firmware_ver/";

let wosendor = new Lywsd03mmc (blu_mac, ble_ctl_path, function (error, value) {
    console.log (value);
    console.log (error);
});
