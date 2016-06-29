## Prerequisites

### OS X

* install [Xcode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12)

### Linux

* Kernel version 3.6 or above
* ```libbluetooth-dev```

#### Ubuntu/Debian/Raspbian

```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

Make sure ```node``` is on your path, if it's not, some options:
* symlink ```nodejs``` to ```node```: ```sudo ln -s /usr/bin/nodejs /usr/bin/node```
* [install Node.js using the NodeSource package](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

#### Fedora / Other-RPM based

```sh
sudo yum install bluez bluez-libs bluez-libs-devel
```

#### Intel Edison

See [Configure Intel Edison for Bluetooth LE (Smart) Development](http://rexstjohn.com/configure-intel-edison-for-bluetooth-le-smart-development/)

### Windows

* [node-gyp requirements for Windows](https://github.com/TooTallNate/node-gyp#installation)
   * Python 2.7
   * Visual Studio ([Express](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx))
* [node-bluetooth-hci-socket prerequisites](https://github.com/sandeepmistry/node-bluetooth-hci-socket#windows)
   * Compatible Bluetooth 4.0 USB adapter
   * [WinUSB](https://msdn.microsoft.com/en-ca/library/windows/hardware/ff540196(v=vs.85).aspx) driver setup for Bluetooth 4.0 USB adapter, using [Zadig tool](http://zadig.akeo.ie/)

See [@don](https://github.com/don)'s set up guide on [Bluetooth LE with Node.js and Noble on Windows](https://www.youtube.com/watch?v=mL9B8wuEdms).

## Running on Linux

### Running without root/sudo

Run the following command:

```sh
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

This grants the ```node``` binary ```cap_net_raw``` privileges, so it can start/stop BLE advertising.

__Note:__ The above command requires ```setcap``` to be installed, it can be installed using the following:

* apt: ```sudo apt-get install libcap2-bin```
* yum: ```su -c \'yum install libcap2-bin\'```

### Multiple Adapters

```hci0``` is used by default to override set the ```NOBLE_HCI_DEVICE_ID``` environment variable to the interface number.

Example, specify ```hci1```:

```sh
sudo NOBLE_HCI_DEVICE_ID=1 node <your file>.js
```

### Reporting all HCI events

By default noble waits for both the advertisement data and scan response data for each Bluetooth address. If your device does not use scan response the following environment variable can be used to bypass it.


```sh
sudo NOBLE_REPORT_ALL_HCI_EVENTS=1 node <your file>.js
```

### bleno compatibility

By default noble will respond with an error whenever a GATT request message is received. If your intention is to use bleno in tandem with noble, the following environment variable can be used to bypass this functionality. __Note:__ this requires a Bluetooth 4.1 adapter.

```sh
sudo NOBLE_MULTI_ROLE=1 node <your file>.js
```
