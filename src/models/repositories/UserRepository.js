import { User } from 'models/models'
import mongoose from 'mongoose'

class UserRepository {
  upsertUser = async (id, nUser) => {
    let user
    const dbUser = await User.findById(id)

    if (!dbUser) {
      user = new User({
        _id: id,
        ...nUser,
      })
    } else {
      user = Object.assign(dbUser, nUser)
    }

    return user.save()
  }

  getUserInfo = id => {
    return User.findById(id, '_id info').lean()
  }

  getUserInfoByArray = ids => {
    return User.find({ _id: { $in: ids } }, '_id info').lean()
  }

  getFriendsInfoByArray = ids => {
    return User.find(
      { _id: { $in: ids } },
      '_id info.fullName info.link info.pictures'
    ).lean()
  }

  insertUserGroupPost = async (userId, pair) => {
    const user = await User.findById(userId)
    user.meta.posts.push(pair)
    return user.save()
  }

  deleteUserPost = (userId, postId) => {
    return User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { 'meta.posts': { postId: postId } },
      }
    )
  }
}

export default UserRepository
