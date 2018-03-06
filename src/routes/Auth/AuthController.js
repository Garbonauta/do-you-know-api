import {getAuthInfoFromJWT} from 'helpers/utils'
import {getAuth0FullUserProfile} from 'helpers/api'
import {upsertUserFromProfile, getUserFriendsFromProfile} from 'model/services/UserService'
import Boom from 'boom'

class AuthController {
  async get(req, h) {
    const authInfo = getAuthInfoFromJWT(req);

    const profile = await getAuth0FullUserProfile(authInfo);

    if (authInfo === profile.user_id) {
      const promises = [upsertUserFromProfile(profile), getUserFriendsFromProfile(profile.context.mutual_friends.data)];

      await Promise.all(promises);
      return {auth: "Authed"}
    }
    return Boom.forbidden('Operation is forbidden for user access');
  }
}

export default AuthController;
