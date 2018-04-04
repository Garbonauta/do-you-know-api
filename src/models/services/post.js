import {
  getPost as getPostDb,
  insertPost as insertPostDb,
  deletePost as deletePostDb,
} from 'models/repositories/post'

export async function insertPost(post) {
  const obj = await insertPostDb(post)
  return obj.toObject()
}

export function getPost(postId) {
  return getPostDb(postId)
}

export function deletePost(postId) {
  return deletePostDb(postId)
}
