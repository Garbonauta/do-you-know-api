'use strict';

import {AuthController} from 'controllers'
const authController = new AuthController();

const AuthRoutesPlugin = {
  name: 'AuthRoutesPlugin',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/auth',
      handler: authController.get
    })
  }
};

export default AuthRoutesPlugin;
