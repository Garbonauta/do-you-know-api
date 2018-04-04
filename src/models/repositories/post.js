import { Post } from 'models/models'
import mongoose from 'mongoose'

export function insertPost({ groupId, postText, owner, createdAt }) {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    groupId,
    owner,
    text: postText,
    createdAt: new Date(createdAt),
  })
  return post.save()
}

export function getPost(postId) {
  return Post.findById(postId)
    .populate(
      'owner',
      '_id info.firstName info.middleName info.lastName info.fullName info.link info.email info.pictures meta.score meta.groups createdAt'
    )
    .lean()
}

export function getPostsByGroupId(groupId) {
  return Post.find({ groupId: groupId })
    .populate('owner', 'info.fullName info.link info.pictures.small')
    .lean()
}

export function deletePost(postId) {
  return Post.findByIdAndRemove(postId)
}
