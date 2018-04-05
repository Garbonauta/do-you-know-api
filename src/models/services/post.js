import {
  getPost as getPostDb,
  getPostsByGroupId as getPostsByGroupIdDb,
  insertPost as insertPostDb,
  deletePost as deletePostDb,
} from 'models/repositories/post'
import {
  insertUserGroupPost,
  deleteUserPost as deleteUserPostUserService,
} from 'models/repositories/user'

export async function insertPost(post) {
  const obj = await insertPostDb(post)
  return obj.toObject()
}

export async function getPost(postId) {
  return await getPostDb(postId)
}

export async function getPostByGroupId(groupId, { lastId, recordCount }) {
  let query = { groupId: groupId }
  if (lastId) {
    query = Object.assign(query, { _id: { $lt: lastId } })
  }
  return await getPostsByGroupIdDb(query, recordCount)
}

export function deletePost(postId) {
  return deletePostDb(postId)
}

export async function postUserPost(userId, groupId, payload) {
  payload.groupId = groupId
  try {
    const post = await insertPost(payload)
    await insertUserGroupPost(userId, { groupId, postId: post._id })
    return post
  } catch (error) {
    throw error
  }
}

export function deleteUserPost(userId, postId) {
  try {
    return Promise.all([
      deletePost(postId),
      deleteUserPostUserService(userId, postId),
    ])
  } catch (error) {
    throw error
  }
}
