import ValidationRepository from 'models/repositories/ValidationRepository'
import { PostServiceFactory, UserServiceFactory } from 'models/services'

class ValidationService {
  constructor({ validationRepository, postService, userService }) {
    this.validationRepository = validationRepository
    this.postService = postService
    this.userService = userService
  }
  isSuperUser = async userId => {
    try {
      const userInfo = await this.userService.getUserInfo(userId)
      return userInfo.superUser === true
    } catch (error) {
      return false
    }
  }

  isPostOwner = async (postId, userId) => {
    try {
      const post = await this.postService.getPost(postId)
      return post.owner._id === userId
    } catch (error) {
      return false
    }
  }

  isGroupModerator = async (groupId, userId) => {
    try {
      const group = await this.validationRepository.isGroupModerator(
        groupId,
        userId
      )
      return group !== undefined && group !== null
    } catch (error) {
      return false
    }
  }

  isGroupPostUser = async (groupId, postId, userId) => {
    return await this.validationRepository.isGroupPostOwner(
      groupId,
      postId,
      userId
    )
  }

  validateUserGroup = async (userId, groupId) => {
    try {
      const user = await this.validationRepository.userGroupExists(
        userId,
        groupId
      )
      return user !== undefined && user !== null
    } catch (error) {
      return false
    }
  }
}

export const ValidationServiceFactory = () => {
  const validationRepository = new ValidationRepository()
  return new ValidationService({
    validationRepository,
    postService: PostServiceFactory(),
    userService: UserServiceFactory(),
  })
}
