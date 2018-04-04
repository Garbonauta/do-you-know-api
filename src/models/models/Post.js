import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  groupId: Schema.Types.ObjectId,
  text: String,
  owner: { type: String, ref: 'User' },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: Date,
})

const Post = mongoose.model('Post', postSchema)

export default Post
