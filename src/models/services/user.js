import {
  upsertUser as upsertUserDb,
  getUserInfo as getUserInfoDb,
  getFriendsInfoByArray,
  userGroupExists as userGroupExistsDb,
  insertUserGroupPost as insertUserGroupPostDb,
} from 'models/repositories/user'

export async function upsertUser(id, user) {
  const result = await upsertUserDb(id, user)
  delete result.info.email
  return result
}

export function getUserInfo(id) {
  return getUserInfoDb(id)
}

export function getFriendsFromList(friends) {
  const friendsIds = friends.map(friend => `facebook|${friend.id}`)
  return getFriendsInfoByArray(friendsIds)
}

export async function insertUserGroupPost(userId, pair) {
  return await insertUserGroupPostDb(userId, pair)
}
