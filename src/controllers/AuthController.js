import {getAuthInfoFromJWT} from 'helpers/utils'
import {getAuth0FullUserProfile} from 'helpers/api'
import {updateOrInsertUser} from 'repositories/AuthRepository'

class AuthController {
  async get(req, h) {
    const authInfo = getAuthInfoFromJWT(req);

    const profile = await getAuth0FullUserProfile(authInfo);
    await updateOrInsertUser(profile);

    return {auth: "Authed"}
  }
}

export default AuthController;
