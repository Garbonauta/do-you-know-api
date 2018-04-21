import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const { Schema } = mongoose

const postSchema = new Schema({
  groupId: { type: Number, ref: 'Group' },
  groupName: String,
  text: String,
  owner: { type: String, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: Date,
})

autoIncrement.initialize(mongoose.connection)
postSchema.plugin(autoIncrement.plugin, {
  model: 'Post',
  field: '_id',
  startAt: 0,
  incrementBy: Math.floor(Math.random() * 40) + 1,
})
const Post = mongoose.model('Post', postSchema)

export default Post
