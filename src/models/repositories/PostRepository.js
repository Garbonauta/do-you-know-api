import { Post } from 'models/models'
import mongoose from 'mongoose'

class PostRepository {
  insertPost({ groupId, postText, owner, createdAt }) {
    const post = new Post({
      groupId,
      owner,
      text: postText,
      createdAt: new Date(createdAt),
    })
    return post.save()
  }

  getPost(postId) {
    return Post.findById(postId)
      .populate(
        'owner',
        '_id info.firstName info.middleName info.lastName info.fullName info.link info.email info.pictures meta.score meta.groups createdAt'
      )
      .lean()
  }

  getPostsByGroupId(query, recordCount) {
    return Post.find(query)
      .populate('owner', 'info.fullName info.link info.pictures.small')
      .sort({ createdAt: -1 })
      .limit(recordCount)
      .lean()
  }

  deletePost(postId) {
    return Post.findByIdAndRemove(postId)
  }
}

export default PostRepository
