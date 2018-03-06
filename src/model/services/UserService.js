import {upsertUserAndDetails,getUserFriends} from 'model/repositories/UserRepository'

export function upsertUserFromProfile({
                                        user_id: id, given_name: firstName, middle_name: middleName, family_name: lastName, name: fullName,
                                        gender, picture, picture_large: pictureLarge, link, email,
                                        logins_count: loginCount, created_at: createdAt, last_login: lastLogin
                                      }) {
  return upsertUserAndDetails({
    id,
    firstName,
    middleName,
    lastName,
    fullName,
    gender,
    picture,
    pictureLarge,
    link,
    email,
    loginCount,
    createdAt,
    lastLogin,
  })
}

export function getUserFriendsFromProfile(friends) {
  const friendsIds = friends.map(friend => `facebook|${friend.id}`);
  return getUserFriends(friendsIds);
  console.log(friendsIds)
}
