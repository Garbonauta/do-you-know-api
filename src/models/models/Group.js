import mongoose from 'mongoose'

const {Schema} = mongoose;

const groupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  pictureUrl: String,
  owner: String,
  moderators: [{type: String, ref: 'Users'}],
  members: [{type: Schema.Types.Mixed, ref: 'Users'}],
  visibility: Boolean,
  createdAt: {type: Date, default: Date.now()},
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
