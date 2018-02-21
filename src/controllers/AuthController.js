import { getAuthInfoFromJWT } from '../helpers/utils'
import { getAuth0FullUserProfile } from '../helpers/api'

class AuthController {
  get(req, h) {
    console.info('auth');
    const authInfo = getAuthInfoFromJWT(req);
    getAuth0FullUserProfile(authInfo)
      .then(resp => {
        console.log('resp', resp)
      });

    return {auth: "Authed"}
  }
}

export default AuthController;
