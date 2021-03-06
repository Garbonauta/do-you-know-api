import { PostControllerFactory } from './PostController'
const postController = PostControllerFactory()

const PostRoutesPlugin = {
  name: 'PostRoutesPlugin',
  version: '1.0.0',
  register: async function(server) {
    server.route({
      method: 'DELETE',
      path: '/{postId}',
      config: {
        response: {
          emptyStatusCode: 204,
        },
      },
      handler: postController.deletePost,
    })
    server.route({
      method: 'POST',
      path: '/{postId}',
      handler: postController.postComment,
    })
  },
}

export default PostRoutesPlugin
