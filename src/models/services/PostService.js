import PostRepository from 'models/repositories/PostRepository'
import { UserServiceFactory } from 'models/services'
import { setCollectionOwner, getSimpleOwner } from 'helpers/utils'

export default class PostService {
  constructor({ postRepository, userService }) {
    this.postRepository = postRepository
    this.userService = userService
  }

  getPost = async postId => {
    return await this.postRepository.getPost(postId)
  }

  getPostByGroupId = async (groupId, { lastId, recordCount }) => {
    let query = { groupId: groupId }
    if (lastId) {
      query = Object.assign(query, { _id: { $lt: lastId } })
    }
    try {
      const posts = await this.postRepository.getPostsByGroupId(
        query,
        recordCount
      )
      return await setCollectionOwner.call(this, posts)
    } catch (error) {
      throw error
    }
  }

  deletePost(postId) {
    return this.postRepository.deletePost(postId)
  }

  postUserPost = async (userId, groupId, payload) => {
    try {
      const post = await this.postRepository.insertPost(payload)
      const postObj = post.toObject()
      postObj.owner = await getSimpleOwner.call(this, post)
      return postObj
    } catch (error) {
      throw error
    }
  }

  deleteUserPost(userId, postId) {
    try {
      return Promise.all([this.postRepository.deletePost(postId)])
    } catch (error) {
      throw error
    }
  }
}

export const PostServiceFactory = () => {
  const postRepository = new PostRepository()
  return new PostService({ postRepository, userService: UserServiceFactory() })
}
