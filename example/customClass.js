try {
  const { Device } = require('../src')

  class MyDevice extends Device {
    constructor(id, name) {
      super(id, name, {})

      this.addNode('mynode', 'myNode', 'my', {})
      this.node('mynode').addProperty('myproperty', 'myProperty', 'string')

      this.node('mynode').property('myproperty').set('myValue')
      
      this.setState('ready')
    }
  }

  const myD1 = new MyDevice('d1', 'MyD1')
  const myD2 = new MyDevice('d2', 'MyD2')
} catch (e) {
  console.error(e)
}