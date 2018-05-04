import { UserServiceFactory } from 'models/services'

class LoginService {
  constructor({ userService }) {
    this.userService = userService
  }
  handleUserProfile = async ({
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
    context,
    logins_count: loginCount,
    created_at: createdAt,
    last_login: lastLogin,
  }) => {
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
          large: pictureLarge,
        },
      },
      createdAt,
      loginCount,
      lastLogin,
    }
    const friendsList = context.hasOwnProperty('mutual_friends')
      ? context.mutual_friends.data.friendsList
      : []

    const [user, friends] = await Promise.all([
      this.userService.upsertUser(id, profileUser),
      this.userService.getFriendsFromList(friendsList),
    ])
    user.friends = friends
    delete user.superUser
    return user
  }
}

export const LoginServiceFactory = () =>
  new LoginService({ userService: UserServiceFactory() })
