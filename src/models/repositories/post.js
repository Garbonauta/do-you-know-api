import { Post } from 'models/models'
import mongoose from 'mongoose'

export function insertPost({ postText, owner, createdAt }) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text: postText,
    owner,
    createdAt: new Date(createdAt),
  })
  return post.save()
}

export async function getPost(postId) {
  return Post.findById(postId)
    .populate(
      'owner',
      '_id info.firstName info.middleName info.lastName info.fullName info.link info.email info.pictures meta.score meta.groups createdAt'
    )
    .lean()
}

export function deletePost(postId) {
  return Post.findByIdAndRemove(postId)
}
