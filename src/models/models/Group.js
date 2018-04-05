import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const { Schema } = mongoose

const groupSchema = new Schema({
  name: String,
  pictureUrl: String,
  owner: { type: String, ref: 'User' },
  moderators: [{ type: String, ref: 'User' }],
  members: [{ type: Schema.Types.Mixed, ref: 'User' }],
  visibility: Boolean,
  createdAt: { type: Date, default: Date.now() },
})

autoIncrement.initialize(mongoose.connection)
groupSchema.plugin(autoIncrement.plugin, 'Group')
const Group = mongoose.model('Group', groupSchema)

export default Group
