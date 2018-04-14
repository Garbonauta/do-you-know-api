import PostRepository from 'models/repositories/PostRepository'

class PostService {
  constructor({ postRepository }) {
    this.postRepository = postRepository
  }
  insertPost = async post => {
    const obj = await this.postRepository.insertPost(post)
    return obj.toObject()
  }

  getPost = async postId => {
    return await this.postRepository.getPost(postId)
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
    try {
      return await this.postRepository.insertPost(payload)
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

const postRepository = new PostRepository()
export const PostServiceFactory = () => new PostService({ postRepository })
