import LoginController from './LoginController'
const loginController = new LoginController();

const LoginRoutesPlugin = {
  name: 'LoginRoutesPlugin',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/login',
      handler: loginController.login
    })
  }
};

export default LoginRoutesPlugin;
