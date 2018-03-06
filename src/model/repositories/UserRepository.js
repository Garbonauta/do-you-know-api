import Knex from 'config/knex'

function upsertUser(trx, {id, firstName, middleName, lastName, fullName, loginCount, createdAt, lastLogin}) {
  return trx.raw(
    `insert into users (user_id, first_name, middle_name, last_name, full_name, login_count, created_at, last_login)
       values (:id, :firstName, :middleName, :lastName, :fullName, :loginCount, :createdAt, :lastLogin)
     on conflict (user_id) do update
     set first_name = :firstName, middle_name = :middleName, last_name = :lastName, full_name = :fullName,
         login_count = :loginCount, created_at = :createdAt, last_login = :lastLogin
     returning *`,
    {
      id,
      firstName,
      middleName: middleName || null,
      lastName: lastName || null,
      fullName,
      loginCount: loginCount || null,
      createdAt: createdAt ? new Date(createdAt) : null,
      lastLogin: lastLogin ? new Date(lastLogin) : null,
    }
  );
}

function upsertUserDetails(trx, {id, email, link, picture, pictureLarge, gender}) {
  return trx.raw(
    `insert into users_details (user_id, email, link, picture, picture_large, gender)
       values (:id, :email, :link, :picture, :pictureLarge, :gender)
     on conflict (user_id) do update
     set email = :email, link = :link, picture = :picture, picture_large = :pictureLarge, gender = :gender
     returning *`,
    {
      id,
      email,
      link,
      picture,
      pictureLarge,
      gender,
    }
  );
}

export function upsertUserAndDetails(user) {
  return Knex.transaction(async trx => {
    try {
      await upsertUser(trx, user);
      await upsertUserDetails(trx, user.details);
      trx.commit;
    } catch (exception) {
      trx.rollback;
    }
  })
}

export function getUserFriends(friends) {
  return Knex
    .select('users.first_name', 'users.middle_name', 'users.last_name', 'users.full_name',
      'users_details.picture', 'users_details.link')
    .from('users')
    .innerJoin('users_details', 'users.user_id', 'users_details.user_id')
    .whereIn('users.user_id', friends);
}
