import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { getGroups } from 'models/services/group'
import { postUserGroupPost } from "models/services/groupPost";
import { validateUserGroup, validateSuperUser } from "models/services/validation";
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
    const authInfo = getAuthInfoFromJWT(req);
    const groupId = req.params.groupId;
    const data = req.payload;

    if(!validateUserGroup(authInfo, groupId) && !validateSuperUser(authInfo) && !data.owner === authInfo) {
      return Boom.unauthorized("Unauthorized User");
    }

    try {
      return await postUserGroupPost(authInfo, groupId, data)
    } catch(error) {
      return Boom.badRequest(error)
    }
  }
}

export default GroupController;
