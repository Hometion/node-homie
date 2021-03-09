const Property = require('./property')

class Node {
  constructor(device, id, name, type, opts) {
    this.device = device
    this.id = id
    this.name = name
    this.type = type
    this.opts = opts || {}
    this.properties = {}

    this.device.mqtt.publish(`homie/${this.device.id}/${this.id}/$name`, this.name)
    this.device.mqtt.publish(`homie/${this.device.id}/${this.id}/$type`, this.type)
  }

  addProperty(id, name, type, opts) {
    this.properties[id] = new Property(this, id, name, type, opts)
    this.device.mqtt.publish(`homie/${this.device.id}/${this.id}/$nodes`, Object.keys(this.properties).join(','))
  }

  property(id) {
    return this.properties[id]
  }
}

module.exports = Node