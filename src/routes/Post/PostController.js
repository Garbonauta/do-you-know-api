import {
  CommentServiceFactory,
  PostServiceFactory,
  ValidationServiceFactory,
} from 'models/services'
import { getAuthInfoFromJWT } from '../../helpers/utils'
import Boom from 'boom'

class PostController {
  constructor({ commentService, postService, validationService }) {
    this.commentService = commentService
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
  postComment = async (req, h) => {
    const data = req.payload
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId

    try {
      if (
        !this.validationService.validateUserGroup(authInfo, groupId) &&
        !data.owner === authInfo
      ) {
        return Boom.unauthorized('Unauthorized User')
      }
      req.server.publish(`/notifications/${data.postOwner}`, { text: 'here' })
      return await this.commentService.insertComment(data)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Creating Comment')
    }
  }
}

export const PostControllerFactory = () =>
  new PostController({
    commentService: CommentServiceFactory(),
    postService: PostServiceFactory(),
    validationService: ValidationServiceFactory(),
  })
