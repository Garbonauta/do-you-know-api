import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { getGroups } from 'models/services/group'
import {
  postUserGroupPost,
  getGroupPosts as getGroupPostService,
  deleteUserGroupPost,
} from 'models/services/groupPost'
import {
  validateUserGroup,
  validateSuperUser,
  validateGroupPostUser,
} from 'models/services/validation'
import Boom from 'boom'

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
      if (
        !validateUserGroup(authInfo, groupId) &&
        !validateSuperUser(authInfo)
      ) {
        return Boom.unauthorized('Unauthorized User')
      }
      return await getGroupPostService(groupId)
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
        !validateSuperUser(authInfo) &&
        !data.owner === authInfo
      ) {
        return Boom.unauthorized('Unauthorized User')
      }

      return await postUserGroupPost(authInfo, groupId, data)
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Creating New Post')
    }
  }
  async deleteGroupPost(req, h) {
    const authInfo = getAuthInfoFromJWT(req)
    const groupId = req.params.groupId
    const postId = req.params.postId

    try {
      deleteUserGroupPost(authInfo, groupId, postId)
      return { text: 'OK' }
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected Error Creating New Post')
    }
  }
}

export default GroupController
