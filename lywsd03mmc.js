const child_process = require ('child_process');
const path          = require ('path');
const AsyncLock     = require ('async-lock');


class Lywsd03mmc {
  constructor (ble_mac, ble_ctl_path = '/usr/local/lib/node_modules/lywsd03mmc/', callback) {
    const lock = new AsyncLock ();
    lock.acquire ('ble_key', function () {
      const ble_ctl = child_process.fork (path.join (ble_ctl_path, 'ble_ctl.js'));

      ble_ctl.send (ble_mac);

      ble_ctl.on ('message', function (json) {
        let buf = Buffer.from (json.message.ServiceData["0000181a-0000-1000-8000-00805f9b34fb"]);
        ble_ctl.kill ('SIGINT');
          callback (null, {
            te: Math.round ((buf[7] << 8 | buf[6]) / 10) / 10,
            hu: Math.round ((buf[9] << 8 | buf[8]) / 10) / 10,
            bt: buf[12]
          });
          return;
      })

      ble_ctl.on ('error', function (error) {
        callback (error, null);
        return;
      })
    }
  )}
}

if (require.main === module) {
  new Lywsd03mmc (process.argv[2], process.argv[3], function (error, value) {
    console.log (value);
    console.log (error);
  });
}
else {
  module.exports = Lywsd03mmc;
}
