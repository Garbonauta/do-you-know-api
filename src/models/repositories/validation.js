import { User, GroupPost } from 'models/models'
import mongoose from 'mongoose'

export function userGroupExists(userId, groupId) {
  return User.find({
    _id: userId,
    'meta.groups': { $exists: true, $in: [groupId] },
  })
}

export function getGroupModerator(groupId, userId) {
  return Group.find({
    _id: groupId,
    moderators: {
      $exists: true,
      $in: [userId],
    },
  })
}

export function getGroupPostOwner(groupId, postId, userId) {
  return GroupPost.findOne({
    _id: groupId,
    'posts._id': postId,
    'posts.owner': userId,
  })
}
