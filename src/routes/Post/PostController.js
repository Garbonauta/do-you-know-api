import { PostServiceFactory, ValidationServiceFactory } from 'models/services'
import { getAuthInfoFromJWT } from '../../helpers/utils'
import Boom from 'boom'

class PostController {
  constructor({ postService, validationService }) {
    this.postService = postService
    this.validationService = validationService
  }
  deletePost = async (req, h) => {
    const authInfo = getAuthInfoFromJWT(req)
    const postId = req.params.postId
    if (
      !this.validationService.isPostOwner(postId, authInfo) &&
      !this.validationService.isGroupModerator &&
      !this.validationService.isSuperUser(authInfo) &&
      !data.owner === authInfo
    ) {
      return Boom.unauthorized('Unauthorized User')
    }

    try {
      await this.postService.deleteUserPost(authInfo, postId)
      return h.response().code(204)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Deleting Post')
    }
  }
  postComment = (req, h) => {
    const data = req.payload
    return data
  }
}

export const PostControllerFactory = () =>
  new PostController({
    postService: PostServiceFactory(),
    validationService: ValidationServiceFactory(),
  })
