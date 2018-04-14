import { Post } from 'models/models'
import mongoose from 'mongoose'

class PostRepository {
  insertPost({ groupId, groupName, postText, owner, createdAt }) {
    const post = new Post({
      groupId,
      groupName,
      owner,
      text: postText,
      createdAt: new Date(createdAt),
    })
    return post.save()
  }

  getPost(postId) {
    return Post.findById(postId).lean()
  }

  getPostsByGroupId(query, recordCount) {
    return Post.find(query)
      .sort({ createdAt: -1 })
      .limit(recordCount)
      .lean()
  }

  deletePost(postId) {
    return Post.findByIdAndRemove(postId)
  }
}

export default PostRepository
