import GroupController from './GroupController'
const groupController = new GroupController();

const GroupRoutesPlugin = {
  name: 'GroupRoutesPlugin',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: groupController.list,
    });
    server.route({
      method: 'POST',
      path: '/{groupId}/posts',
      handler: groupController.createGroupPost,
    });
  }
};

export default GroupRoutesPlugin;
