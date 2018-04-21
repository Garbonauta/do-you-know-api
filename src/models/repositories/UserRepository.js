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

  getSimpleUserInfo = id => {
    return User.aggregate([
      { $match: { _id: id } },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          fullName: '$info.fullName',
          link: '$info.link',
          picture: '$info.pictures.small',
        },
      },
    ])
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
}

export default UserRepository
