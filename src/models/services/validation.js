import { getUser, userGroupExists } from 'models/services/user'
import { getAuthInfoFromJWT } from 'helpers/utils'

export async function validateSuperUser(userId) {
  try {
    const userInfo = await getUser(userId);
    return userInfo.superUser === true;
  } catch (error) {
    return false
  }
}

export function validateUserIdAuth (authInfo, userId) {
  return authInfo === userId;
}

export async function validateUserGroup(userId, groupId) {
  try {
    return await userGroupExists(userId, groupId)
  } catch(error) {
    return false
  }
}


