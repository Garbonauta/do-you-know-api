import {
  upsertUser as upsertUserDb, getUserInfo as getUserInfoDb, getFriendsInfoByArray} from 'models/repositories/user'

export async function upsertUser(id, user) {
  const result =  await upsertUserDb(id, user);
  delete result.info.email;
  return result;
}

export function getUserInfo(id) {
  return getUserInfoDb(id);
}

export function getFriendsFromList(friends) {
  const friendsIds = friends.map(friend => `facebook|${friend.id}`);
  return getFriendsInfoByArray(friendsIds);
}
//
// export async function getUser(id) {
//   const user = await getUserDb(id);
//   if (user.length === 1) {
//     return user[0];
//   }
//   throw new Error('Error fetching user')
// }
//
// export function getUserGroups(id) {
//   return getUserGroupsDb(id)
// }

