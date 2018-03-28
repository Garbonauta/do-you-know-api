import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  info: {
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String,
    link: String,
    email: String,
    gender: String,
    pictures: {
      small: String,
      large: String,
    }
  },
  meta: {
    favoriteGroup: Schema.Types.ObjectId,
    score: {type:Number, default: 0},
    groups: [{type:Schema.Types.ObjectId, ref: 'Group'}],
    posts: [Schema.Types.ObjectId],
    comments: [Schema.Types.ObjectId],
  },
  notifications: [Schema.Types.Mixed],
  superUser: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now()},
  lastLogin: {type: Date, default: Date.now()},
  loginCount: Number,
});

const User = mongoose.model('User', userSchema);

export default User;
