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

  getFriendsFromList = friends => {
    const friendsIds = friends.map(friend => `facebook|${friend.id}`)
    return this.userRepository.getFriendsInfoByArray(friendsIds)
  }

  insertUserGroupPost = async (userId, pair) => {
    return await this.userRepository.insertUserGroupPost(userId, pair)
  }

  deleteUserPost = async (userId, postId) => {
    return await this.userRepository.deleteUserPost(userId, postId)
  }
}

const userRepository = new UserRepository()
export const UserServiceFactory = () => new UserService({ userRepository })
