import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

const { Schema } = mongoose

const commentSchema = new Schema({
  groupId: { type: Number, ref: 'Group' },
  groupName: String,
  postId: { type: Number, ref: 'Post' },
  text: String,
  owner: {
    userId: String,
    fullName: String,
    link: String,
    picture: String,
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: Date,
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
