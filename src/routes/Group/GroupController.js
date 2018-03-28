import {getAuthInfoFromJWT} from 'helpers/utils'
import {getAuth0FullUserProfile} from 'helpers/api'
import {getGroups} from 'models/services/group'
import Boom from 'boom'

class GroupController {
  async list(req, h) {
    try {
      return await getGroups(req.query);
    } catch(error) {
      return Boom.badRequest(error)
    }
  }
}

export default GroupController;
