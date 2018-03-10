import {upsertUser, getFriendsFromList} from 'models/services/user'
import {getGroups} from 'models/services/group'

export async function handleUserProfile({
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

  const profileUser = {
    info: {
      firstName,
      middleName,
      lastName,
      fullName,
      gender,
      link,
      email,
      pictures: {
        small: picture,
        large: pictureLarge
      }
    },
    createdAt,
    loginCount,
    lastLogin,
  };


  const [user, friends] = await Promise.all([upsertUser(id, profileUser), getFriendsFromList(friendsList)]);
  user.friends = friends;
  delete user.superUser;
  return user
}
