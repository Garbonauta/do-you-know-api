import { getAuthInfoFromJWT } from 'helpers/utils'
import { getAuth0FullUserProfile } from 'helpers/api'
import { LoginServiceFactory } from 'models/services'
import Boom from 'boom'

class LoginController {
  constructor({ loginService }) {
    this.loginService = loginService
  }
  login = async (req, h) => {
    try {
      const authInfo = getAuthInfoFromJWT(req)

      const profile = await getAuth0FullUserProfile(authInfo)

      return authInfo === profile.user_id
        ? this.loginService.handleUserProfile(profile)
        : Boom.forbidden('Operation is forbidden for user access')
    } catch (error) {
      req.log('error', error)
      return Boom.badRequest('Unexpected error login in user')
    }
  }
}

export const LoginControllerFactory = () =>
  new LoginController({ loginService: LoginServiceFactory() })
