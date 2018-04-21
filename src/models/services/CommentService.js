import CommentRepository from 'models/repositories/CommentRepository'
import { UserServiceFactory } from 'models/services'
import { getSimpleOwner } from 'helpers/utils'

class CommentService {
  constructor({ commentRepository, userService }) {
    this.commentRepository = commentRepository
    this.userService = userService
  }
  insertComment = async comment => {
    try {
      const com = await this.commentRepository.insertComment(comment)
      const comObj = com.toObject()
      comObj.owner = await getSimpleOwner.call(this, com)
      return comObj
    } catch (error) {
      throw error
    }
  }
}

export const CommentServiceFactory = () => {
  const commentRepository = new CommentRepository()
  return new CommentService({
    commentRepository,
    userService: UserServiceFactory(),
  })
}
