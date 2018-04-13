import { User, GroupPost } from 'models/models'
import mongoose from 'mongoose'

class ValidationRepository {
  userGroupExists(userId, groupId) {
    return User.find({
      _id: userId,
      'meta.groups': { $exists: true, $in: [groupId] },
    })
  }

  isGroupModerator(groupId, userId) {
    return Group.find({
      _id: groupId,
      moderators: {
        $exists: true,
        $in: [userId],
      },
    })
  }

  isGroupPostOwner(groupId, postId, userId) {
    return GroupPost.findOne({
      _id: groupId,
      'posts._id': postId,
      'posts.owner': userId,
    })
  }
}

export default ValidationRepository
