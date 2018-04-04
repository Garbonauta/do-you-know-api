import mongoose from 'mongoose'

const { Schema } = mongoose

const groupPostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

const GroupPost = mongoose.model('GroupPost', groupPostSchema)

export default GroupPost
