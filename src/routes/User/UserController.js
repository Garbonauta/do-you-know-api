import {getAuth0FullUserProfile} from 'helpers/api'
import {getUserGroups} from 'models/services/user'
import {validateOwnerOrSuperUser} from 'models/services/validation'
import Boom from 'boom'

class UserController {
  async groups(req, h) {
    const user = req.params.user;
    const validation = await validateOwnerOrSuperUser(req);

    if (!validation) {
      return Boom.forbidden('Operation is forbidden for user access');
    }

    return getUserGroups(user)
  }
}

export default UserController;
