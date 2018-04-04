import { GroupPost, Post } from 'models/models'
import mongoose from 'mongoose'
import Group from '../models/Group'

export async function getGroupPosts(groupId) {
  return await GroupPost.findById(groupId)
    .populate({
      path: 'posts',
      populate: {
        path: 'owner',
        select: 'info.fullName info.link info.pictures.small',
      },
    })
    .lean()
}

export async function insertGroupPost(groupId, postId) {
  let groupPost =
    (await GroupPost.findById(groupId)) ||
    new GroupPost({ _id: groupId, posts: [] })

  groupPost.posts.push(postId)

  return groupPost.save()
}

export function deleteGroupPost(groupId, postId) {
  return GroupPost.findOneAndUpdate(
    { _id: groupId },
    {
      $pull: { posts: { $in: [postId] } },
    }
  )
}
