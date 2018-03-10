import {getUser} from 'models/services/user'
import {getAuthInfoFromJWT} from 'helpers/utils'


export async function validateOwnerOrSuperUser (request) {
  const authInfo = getAuthInfoFromJWT(request);
  const userId = request.params.user;
  if (authInfo === userId) {
    return true;
  }
  const userInfo = await getUser(authInfo);

  return userInfo.superUser ? userInfo.superUser: false;
}
