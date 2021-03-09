
class Property {
  constructor(node, id, name, datatype, opts) {
    this.node = node
    this.id = id
    this.name = name
    this.datatype = datatype
    this.opts = opts || {}
    this.value = null

    this.retained = opts?.retained === undefined ? true  : opts.retained
    this.settable = opts?.settable === undefined ? false : opts.settable
    this.format   = opts?.format   === undefined ? ''    : opts.format
    this.unit     = opts?.unit     === undefined ? ''    : opts.unit
  
    this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$name`, this.name?.toString() || '')
    this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$datatype`, this.datatype?.toString() || '')
    this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$retained`, this.retained?.toString() || '')
    this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$settable`, this.settable?.toString() || '')

    if (this.format.length > 0)
      this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$format`, this.format)

    if (this.unit.length > 0)
      this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}/$unit`, this.unit)
  }

  listen(cb) {

  }

  set(value) {
    this.value = value
    this.node.device.mqtt.publish(`homie/${this.node.device.id}/${this.node.id}/${this.id}`, value)
  }

}

module.exports = Property