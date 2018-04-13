import { LoginControllerFactory } from './LoginController'
const loginController = LoginControllerFactory()

const LoginRoutesPlugin = {
  name: 'LoginRoutesPlugin',
  version: '1.0.0',
  register: async function(server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: loginController.login,
    })
  },
}

export default LoginRoutesPlugin
