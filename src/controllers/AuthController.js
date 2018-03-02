import {getAuthInfoFromJWT} from '../helpers/utils'
import {getAuth0FullUserProfile} from '../helpers/api'

class AuthController {
  get(req, h) {
    const authInfo = getAuthInfoFromJWT(req);
    getAuth0FullUserProfile(authInfo)
      .then(resp => {
        console.log('resp', resp)
      })
      .catch(error => console.log('error', error));
    return {auth: "Authed"}
  }
}

export default AuthController;
