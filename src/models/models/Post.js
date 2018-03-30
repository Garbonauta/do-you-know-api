import mongoose from 'mongoose'

const {Schema} = mongoose;

export const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  groupId: Schema.Types.ObjectId,
  text: String,
  owner: String,
  createdAt: {type: Date, default: Date.now()},
  modifiedAt: Date,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
