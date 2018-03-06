import {getAuthInfoFromJWT} from 'helpers/utils'
import {getAuth0FullUserProfile} from 'helpers/api'
import {getUserWithProfile} from 'model/services/UserService'
import Boom from 'boom'

class LoginController {
  async login(req, h) {
    const authInfo = getAuthInfoFromJWT(req);

    const profile = await getAuth0FullUserProfile(authInfo);

    return authInfo === profile.user_id
      ? getUserWithProfile(profile)
      : Boom.forbidden('Operation is forbidden for user access');
  }
}

export default LoginController;
