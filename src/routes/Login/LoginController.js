import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { handleUserProfile } from 'models/services/login'
import Boom from 'boom'

class LoginController {
  async login(req, h) {
    try {
      const authInfo = getAuthInfoFromJWT(req);

      const profile = await getAuth0FullUserProfile(authInfo);

      return authInfo === profile.user_id
        ? handleUserProfile(profile)
        : Boom.forbidden('Operation is forbidden for user access');
    }
    catch (error) {
      req.log('error', error);
      return Boom.badRequest('Unexpected error login in user')
    }
  }
}

  export default LoginController;
