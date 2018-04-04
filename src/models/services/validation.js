import { getUser } from 'models/services/user'
import { getPost } from 'models/services/post'
import {
  userGroupExists as userGroupExistsDb,
  getGroupModerator,
  getGroupPostOwner,
} from 'models/repositories/validation'
import { getAuthInfoFromJWT } from 'helpers/utils'

export async function isSuperUser(userId) {
  try {
    const userInfo = await getUser(userId)
    return userInfo.superUser === true
  } catch (error) {
    return false
  }
}

export async function isPostOwner(postId, userId) {
  try {
    const post = await getPost(postId)
    return post.owner._id === userId
  } catch (error) {
    return false
  }
}

export async function isGroupModerator(groupId, userId) {
  try {
    const group = await getGroupModerator(groupId, userId)
    return typeof group !== 'undefined' && group !== null
  } catch (error) {
    return false
  }
}

export async function validateGroupPostUser(groupId, postId, userId) {
  return await getGroupPostOwner(groupId, postId, userId)
}

export function validateUserIdAuth(authInfo, userId) {
  return authInfo === userId
}

export async function validateUserGroup(userId, groupId) {
  try {
    const user = await userGroupExistsDb(userId, groupId)
    return typeof user !== 'undefined' && user !== null
  } catch (error) {
    return false
  }
}
