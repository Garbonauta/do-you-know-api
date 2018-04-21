import PostRepository from 'models/repositories/PostRepository'
import { UserServiceFactory } from 'models/services'

async function setOwner(posts) {
  return await Promise.all(
    posts.map(async post => {
      post.owner = await getPostOwner.call(this, post)
      return post
    })
  )
}

async function getPostOwner(post) {
  const owner = await this.userService.getSimpleUserInfo(post.owner)
  return owner[0]
}

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
    return await this.postRepository.getPost(postId)
  }

  getPostByGroupId = async (groupId, { lastId, recordCount }) => {
    let query = { groupId: groupId }
    if (lastId) {
      query = Object.assign(query, { _id: { $lt: lastId } })
    }
    const posts = await this.postRepository.getPostsByGroupId(
      query,
      recordCount
    )
    return await setOwner.call(this, posts)
  }

  deletePost(postId) {
    return this.postRepository.deletePost(postId)
  }

  postUserPost = async (userId, groupId, payload) => {
    try {
      const post = await this.postRepository.insertPost(payload)
      const postObj = post.toObject()
      postObj.owner = await getPostOwner.call(this, post)
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

const postRepository = new PostRepository()
export const PostServiceFactory = () =>
  new PostService({ postRepository, userService: UserServiceFactory() })
