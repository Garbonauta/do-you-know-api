import { Post } from 'models/models'
import mongoose from 'mongoose'

export async function insertPost({ postText, owner, createdAt }) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text: postText,
    owner,
    createdAt: new Date(createdAt),
  })
  await post.save()
  return post.toObject()
}

export function deletePost(postId) {
  return Post.findByIdAndRemove(postId)
}
