import {upsertUserAndDetails, getUser as getUserDb, getUserFriends, getUserGroups as getUserGroupsDb} from 'model/repositories/UserRepository'

export function upsertUserModel(user) {
  return upsertUserAndDetails(user);
}

export function getFriendsFromList(friends) {
  const friendsIds = friends.map(friend => `facebook|${friend.id}`);
  return getUserFriends(friendsIds);
}

export async function getUser(id) {
  const user = await getUserDb(id);
  if (user.length === 1) {
    return user[0];
  }
  throw new Error('Error fetching user')
}

export async function getUserWithProfile({
                                           user_id: id,
                                           given_name: firstName,
                                           middle_name: middleName,
                                           family_name: lastName,
                                           name: fullName,
                                           gender,
                                           picture,
                                           picture_large: pictureLarge,
                                           link,
                                           email,
                                           context: {mutual_friends: {data: friendsList}},
                                           logins_count: loginCount,
                                           created_at: createdAt,
                                           last_login: lastLogin,
                                         }) {
  const cProfile = {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
    loginCount,
    createdAt,
    lastLogin,
    details: {
      gender,
      picture,
      pictureLarge,
      link,
      email,
    },
  };

  const p1 = upsertUserModel(cProfile);
  const p2 = getFriendsFromList(friendsList);
  const promises = [p1, p2];

  const [user, userFriends] = await Promise.all(promises);
  cProfile.friends = userFriends;
  return cProfile
}


export function getUserGroups(id) {
  return getUserGroupsDb(id)
}

