import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { getGroups } from 'models/services/group'
import {
  postUserPost,
  getPostByGroupId,
  deleteUserPost,
} from 'models/services/post'
import {
  validateUserGroup,
  isSuperUser,
  validateGroupPostUser,
  isPostOwner,
  isGroupModerator,
} from 'models/services/validation'
import Boom from 'boom'

const PAGE_COUNT_DEFAULT = 8

class GroupController {
  async list(req, h) {
    try {
      return await getGroups(req.query)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
  async getGroupPosts(req, h) {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId

    try {
      if (!validateUserGroup(authInfo, groupId) && !isSuperUser(authInfo)) {
        return Boom.unauthorized('Unauthorized User')
      }
      const queryParams = req.query
      const lastId = queryParams.lastid
      const recordCount = parseInt(queryParams.count) || PAGE_COUNT_DEFAULT
      return await getPostByGroupId(groupId, { lastId, recordCount })
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error when retrieving Posts')
    }
  }
  async createGroupPost(req, h) {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId
    const data = req.payload

    try {
      if (
        !validateUserGroup(authInfo, groupId) &&
        !isSuperUser(authInfo) &&
        !data.owner === authInfo
      ) {
        return Boom.unauthorized('Unauthorized User')
      }

      return await postUserPost(authInfo, groupId, data)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Creating New Post')
    }
  }
  async deleteGroupPost(req, h) {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId
    const postId = req.params.postId
    if (
      !isPostOwner(postId, authInfo) &&
      !isGroupModerator &&
      !isSuperUser(authInfo) &&
      !data.owner === authInfo
    ) {
      return Boom.unauthorized('Unauthorized User')
    }

    try {
      await deleteUserPost(authInfo, postId)
      return h.response().code(204)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Deleting Post')
    }
  }
}

export default GroupController
