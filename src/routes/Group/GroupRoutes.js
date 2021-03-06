import { GroupControllerFactory } from './GroupController'
const groupController = GroupControllerFactory()

const GroupRoutesPlugin = {
  name: 'GroupRoutesPlugin',
  version: '1.0.0',
  register: async function(server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: groupController.list,
    })
    server.route({
      method: 'GET',
      path: '/{groupId}/posts',
      handler: groupController.getGroupPosts,
    })
    server.route({
      method: 'POST',
      path: '/{groupId}/posts',
      handler: groupController.createGroupPost,
    })
  },
}

export default GroupRoutesPlugin
