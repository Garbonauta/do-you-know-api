import {User} from 'models/models'

export async function upsertUser(id, nUser) {
  let user;
  const dbUser = await User.findById(id).populate('meta.groups.groupId', '_id name pictureUrl');

  if(!dbUser) {
    user = new User({
      _id: id,
      ...nUser
    });
  } else {
    user = Object.assign(dbUser, nUser)
  }

  await user.save();

  return user.toObject();
}

export function getUserInfo(id) {
  return User.findById(id, '_id info')
}

export function getUserInfoByArray(ids) {
  return User.find({'_id': { $in: ids}}, '_id info').lean()
}

export function getFriendsInfoByArray(ids) {
  return User.find({'_id': { $in: ids}}, '_id info.fullName info.link info.pictures').lean()
}
