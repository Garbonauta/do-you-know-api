import Hapi from 'hapi'
import hapiAuthJWT from 'hapi-auth-jwt2'
import { mount } from './src/config/Key'
import AuthController from './src/controllers/AuthController'

const authController = new AuthController();

const server = new Hapi.server({
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
  routes: {
    cors: true
  },
});

function registerRoutes () {
  server.route({
    method: 'GET',
    path: '/auth',
    handler: authController.get
  })
}

async function init () {
  await server.register(hapiAuthJWT);

  mount(server);

  registerRoutes();

  await server.start();

  return server;
}

init()
  .then(server => console.log('Server running'))
  .catch(err => console.log('err'));
