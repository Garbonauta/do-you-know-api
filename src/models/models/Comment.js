import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const { Schema } = mongoose

const commentSchema = new Schema({
  groupId: { type: Number, ref: 'Group' },
  groupName: String,
  postId: { type: Number, ref: 'Post' },
  postOwner: { type: String, ref: 'User' },
  text: String,
  owner: { type: String, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: Date,
  score: Number,
  votes: [Schema.Types.Mixed],
})

autoIncrement.initialize(mongoose.connection)
commentSchema.plugin(autoIncrement.plugin, {
  model: 'Comment',
  field: '_id',
  startAt: 0,
  incrementBy: Math.floor(Math.random() * 40) + 1,
})
const Comment = mongoose.model('Comment', commentSchema)

export default Comment
