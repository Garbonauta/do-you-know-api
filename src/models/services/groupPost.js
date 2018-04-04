import {
  insertGroupPost,
  getGroupPosts as getGroupPostsDb,
  deleteGroupPost,
} from 'models/repositories/groupPost'
import { insertPost, deletePost } from 'models/services/post'
import { insertUserGroupPost } from 'models/services/user'

export async function getGroupPosts(groupId) {
  try {
    const posts = await getGroupPostsDb(groupId)
    return posts ? posts : {}
  } catch (error) {
    throw error
  }
}

export function deleteUserGroupPost(userId, groupId, postId) {
  try {
    // return await deleteGroupPost(groupId, postId)
    return Promise.all([deleteGroupPost(groupId, postId), deletePost(postId)])
  } catch (error) {
    throw error
  }
}

export async function postUserGroupPost(userId, groupId, payload) {
  try {
    const post = await insertPost(payload)
    await Promise.all([
      insertGroupPost(groupId, post._id),
      insertUserGroupPost(userId, { groupId, postId: post._id }),
    ])
    return post
  } catch (error) {
    throw error
  }
}
