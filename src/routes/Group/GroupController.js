import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { getGroups } from 'models/services/group'
import { postGroupPost } from "models/services/groupPost";
import Boom from 'boom'

class GroupController {
  async list(req, h) {
    try {
      return await getGroups(req.query);
    } catch(error) {
      return Boom.badRequest(error)
    }
  }
  async createGroupPost(req, h) {
    const groupId = req.params.groupId;
    const data = req.payload;
    try {
      return await postGroupPost(groupId, data)
    } catch(error) {
      return Boom.badRequest(error)
    }
  }
}

export default GroupController;
