import UserController from './UserController'
const userController = new UserController();

const LoginRoutesPlugin = {
  name: 'UserRoutesPlugin',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/{user}/groups',
      handler: userController.groups
    })
  }
};

export default LoginRoutesPlugin;
