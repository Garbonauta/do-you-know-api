import Mongoose from 'mongoose'

const MongoosePlugin = {
  name: 'MongoosePlugin',
  version: '1.0.0',
  register: async function(server) {
    Mongoose.connect(process.env.MONGODB_URI)

    const db = Mongoose.connection

    db.on('error', server.log.bind(server, 'error', 'connection error'))
    db.once('open', function callback() {
      server.log('Connection with database succeeded.')
    })
  },
}

export default MongoosePlugin
