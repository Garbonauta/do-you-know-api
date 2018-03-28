import mongoose from 'mongoose'

const {Schema} = mongoose;

const groupSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  pictureUrl: String,
  owner: {type: String, ref: 'User'},
  moderators: [{type: String, ref: 'User'}],
  members: [{type: Schema.Types.Mixed, ref: 'User'}],
  visibility: Boolean,
  createdAt: {type: Date, default: Date.now()},
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
