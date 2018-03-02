import {getAuthInfoFromJWT} from '../helpers/utils'
import {getAuth0FullUserProfile} from '../helpers/api'

class AuthController {
  async get(req, h) {
    const authInfo = getAuthInfoFromJWT(req);
    const profile = await getAuth0FullUserProfile(authInfo);
    return {auth: "Authed"}
  }
}

export default AuthController;
