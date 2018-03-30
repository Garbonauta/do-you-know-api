import {User} from 'models/models'
import mongoose from "mongoose";

export async function upsertUser(id, nUser) {
  let user;
  const dbUser = await User.findById(id);

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

export function userGroupExists(userId, groupId) {
  return User.find({"_id": userId, "meta.groups": {$exists: true, $in: [groupId]}});
}

export async function insertUserGroupPost(userId, pair) {
  const user = await User.findById(userId);
  user.meta.posts.push(pair);
  return user.save()
  }
