const { Device } = require('../src')

const myDevice = new Device('mydevice', 'myDevice', {});

myDevice.addNode('mynode', 'myNode', 'my', {})

myDevice.node('mynode').addProperty('myproperty', 'myProperty', 'string', {})

myDevice.node('mynode').property('myproperty').listen((msg) => {

})

myDevice.node('mynode').property('myproperty').set('myValue')

myDevice.setState('ready')

myDevice.print()

setTimeout(() => {
  myDevice.stop()
}, 1000)