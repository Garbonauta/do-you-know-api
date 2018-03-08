import {getAuth0FullUserProfile} from 'helpers/api'
import {getUserGroups} from 'model/services/UserService'
import {validateOwnerOrSuperUser} from 'model/services/ValidationService'
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
