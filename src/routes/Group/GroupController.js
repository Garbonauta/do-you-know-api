import { getAuthInfoFromJWT } from 'helpers/utils'
import {
  GroupServiceFactory,
  PostServiceFactory,
  ValidationServiceFactory,
} from 'models/services'
import Boom from 'boom'

const PAGE_COUNT_DEFAULT = 8

class GroupController {
  constructor({ groupService, postService, validationService }) {
    this.groupService = groupService
    this.postService = postService
    this.validationService = validationService
  }
  list = async (req, h) => {
    try {
      return await this.groupService.getGroups(req.query)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
  getGroupPosts = async (req, h) => {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId

    try {
      if (
        !this.validationService.validateUserGroup(authInfo, groupId) &&
        !this.validationService.isSuperUser(authInfo)
      ) {
        return Boom.unauthorized('Unauthorized User')
      }
      const { lastId, count } = req.query
      const recordCount = parseInt(count) || PAGE_COUNT_DEFAULT
      return await this.postService.getPostByGroupId(groupId, {
        lastId,
        recordCount,
      })
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error when retrieving Posts')
    }
  }
  createGroupPost = async (req, h) => {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId
    const data = req.payload

    try {
      if (
        !this.validationService.validateUserGroup(authInfo, groupId) &&
        !this.validationService.isSuperUser(authInfo) &&
        !data.owner === authInfo
      ) {
        return Boom.unauthorized('Unauthorized User')
      }

      return await this.postService.postUserPost(authInfo, groupId, data)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Creating New Post')
    }
  }
  deleteGroupPost = async (req, h) => {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId
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
}

export const GroupControllerFactory = () =>
  new GroupController({
    groupService: GroupServiceFactory(),
    postService: PostServiceFactory(),
    validationService: ValidationServiceFactory(),
  })
