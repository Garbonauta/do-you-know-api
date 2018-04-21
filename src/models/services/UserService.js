import UserRepository from 'models/repositories/UserRepository'

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }
  upsertUser = async (id, user) => {
    const result = await this.userRepository.upsertUser(id, user)
    const resultObj = result.toObject()
    delete resultObj.info.email
    return resultObj
  }

  getUserInfo = id => {
    return this.userRepository.getUserInfo(id)
  }

  getSimpleUserInfo = async id => {
    return await this.userRepository.getSimpleUserInfo(id)
  }

  getFriendsFromList = friends => {
    const friendsIds = friends.map(friend => `facebook|${friend.id}`)
    return this.userRepository.getFriendsInfoByArray(friendsIds)
  }
}

export const UserServiceFactory = () => {
  const userRepository = new UserRepository()
  return new UserService({ userRepository })
}
