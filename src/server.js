import Hapi from 'hapi'
import hapiAuthJWT from 'hapi-auth-jwt2'
import Good from 'good'
import { LoginRoutes, GroupRoutes, PostRoutes } from 'routes'
import MongoosePlugin from 'config/mongoose'
import { mount } from 'config/key'

const server = new Hapi.server({
  port: process.env.PORT || 3000,
  routes: {
    cors: true,
  },
})

async function init() {
  await server.register([
    hapiAuthJWT,
    {
      plugin: Good,
      options: {
        reporters: {
          consoleReporter: [
            {
              module: 'good-console',
              args: [
                {
                  log: '*',
                  response: '*',
                },
              ],
            },
            'stdout',
          ],
        },
      },
    },
  ])

  await server.register(MongoosePlugin)

  await server.register(LoginRoutes, {
    routes: {
      prefix: '/login',
    },
  })

  await server.register(GroupRoutes, {
    routes: {
      prefix: '/groups',
    },
  })

  await server.register(PostRoutes, {
    routes: {
      prefix: '/post',
    },
  })

  mount(server)

  await server.start()

  return server
}

init()
  .then(server =>
    server.log('info', `Server running, port: ${server.info.port}`)
  )
  .catch(err => console.log(err))
