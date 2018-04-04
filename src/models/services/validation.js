import { getUser } from 'models/services/user'
import {
  userGroupExists as userGroupExistsDb,
  getGroupModerator,
  getGroupPostOwner,
} from 'models/repositories/validation'
import { getAuthInfoFromJWT } from 'helpers/utils'

export async function validateSuperUser(userId) {
  try {
    const userInfo = await getUser(userId)
    return userInfo.superUser === true
  } catch (error) {
    return false
  }
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

export async function isGroupModerator(groupId, userId) {
  try {
    const group = await getGroupModerator(groupId, userId)
    return typeof user !== 'undefined' && user !== null
  } catch (error) {
    return false
  }
}

export async function validateGroupPostUser(groupId, postId, userId) {
  return await getGroupPostOwner(groupId, postId, userId)
}
