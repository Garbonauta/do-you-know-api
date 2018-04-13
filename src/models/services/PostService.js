import PostRepository from 'models/repositories/PostRepository'
import { UserServiceFactory } from 'models/services'

class PostService {
  constructor({ postRepository, userService }) {
    this.postRepository = postRepository
    this.userService = userService
  }
  insertPost = async post => {
    const obj = await this.postRepository.insertPost(post)
    return obj.toObject()
  }

  getPost = async postId => {
    return await this.userService.getPost(postId)
  }

  getPostByGroupId = async (groupId, { lastId, recordCount }) => {
    let query = { groupId: groupId }
    if (lastId) {
      query = Object.assign(query, { _id: { $lt: lastId } })
    }
    return await this.postRepository.getPostsByGroupId(query, recordCount)
  }

  deletePost(postId) {
    return this.postRepository.deletePost(postId)
  }

  postUserPost = async (userId, groupId, payload) => {
    payload.groupId = groupId
    try {
      const post = await this.postRepository.insertPost(payload)
      await this.userService.insertUserGroupPost(userId, {
        groupId,
        postId: post._id,
      })
      return post
    } catch (error) {
      throw error
    }
  }

  deleteUserPost(userId, postId) {
    try {
      return Promise.all([
        this.postRepository.deletePost(postId),
        this.userService.deleteUserPost(userId, postId),
      ])
    } catch (error) {
      throw error
    }
  }
}

const postRepository = new PostRepository()
export const PostServiceFactory = () =>
  new PostService({ postRepository, userService: UserServiceFactory() })
