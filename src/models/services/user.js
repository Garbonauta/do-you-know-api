import {
  upsertUser as upsertUserDb,
  getUserInfo as getUserInfoDb,
  getFriendsInfoByArray,
  insertUserGroupPost as insertUserGroupPostDb,
  deleteUserPost as deleteUserPostDb,
} from 'models/repositories/user'

export async function upsertUser(id, user) {
  const result = await upsertUserDb(id, user)
  const resultObj = result.toObject()
  delete resultObj.info.email
  return resultObj
}

export function getUserInfo(id) {
  return getUserInfoDb(id)
}

export function getFriendsFromList(friends) {
  const friendsIds = friends.map(friend => `facebook|${friend.id}`)
  return getFriendsInfoByArray(friendsIds)
}

export function insertUserGroupPost(userId, pair) {
  return insertUserGroupPostDb(userId, pair)
}

export function deleteUserPost(userId, postId) {
  return deleteUserPostDb(userId, postId)
}
