const mqtt = require('mqtt')

const Node = require('./node')

class Device {

  constructor(id, name, opts) {
    this.id = id
    this.name = name
    this.opts = opts || {}
    this.nodes = {}

    let mqtt_opts = {
      will: {
        topic: `homie/${this.id}/$state`,
        retain: true,
        payload: 'lost'
      }
    }

    if (process.env.HAUMIE_BROKER_USERNAME)
      mqtt_opts.username = process.env.HAUMIE_BROKER_USERNAME

    if (process.env.HAUMIE_BROKER_PASSWORD)
      mqtt_opts.username = process.env.HAUMIE_BROKER_PASSWORD

    this.mqtt = mqtt.connect(process.env.HAUMIE_BROKER || 'mqtt://localhost', mqtt_opts)

    this.mqtt.publish(`homie/${this.id}/$homie`, '4.0.0')
    this.mqtt.publish(`homie/${this.id}/$name`, name)
    this.mqtt.publish(`homie/${this.id}/$state`, 'init')
    this.mqtt.publish(`homie/${this.id}/$implementation`, 'node-homie')
  }

  addNode(id, name, type, opts) {
    this.nodes[id] = new Node(this, id, name, type, opts)
    this.mqtt.publish(`homie/${this.id}/$nodes`, Object.keys(this.nodes).join(','))
  }

  node(id) {
    return this.nodes[id]
  }

  setState(state) {

  }

  print() {
    console.log(this.id)

    for (let node of Object.values(this.nodes)) {
      console.log(`|-- ${node.id} (${node.type})`)

      for (let property of Object.values(node.properties)) {
        console.log(`    |-- ${property.id} (${property.datatype}) ${property.value}`)
      }
    }
  }

  stop() {
    this.mqtt.publish(`homie/${this.id}/$state`, 'disconnected', { retain: true });
    this.mqtt.end()
  }

}

module.exports = Device