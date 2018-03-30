import mongoose from 'mongoose'
import { postSchema } from './Post'

const {Schema} = mongoose;

const groupPostSchema = new Schema({
  _id:  Schema.Types.ObjectId,
  posts: [postSchema],
});

const GroupPost = mongoose.model('GroupPost', groupPostSchema);

export default GroupPost;
