import Knex from 'config/knex'

function upsertUser(trx, {id, firstName, middleName, lastName, loginCount, createdAt, lastLogin}) {
  return trx.raw(
    `insert into users (user_id, first_name, middle_name, last_name, login_count, created_at, last_login)
       values (:id, :firstName, :middleName, :lastName, :loginCount, :createdAt, :lastLogin)
     on conflict (user_id) do update
     set first_name = :firstName, middle_name = :middleName, last_name = :lastName, login_count = :loginCount, 
         created_at = :createdAt, last_login = :lastLogin
     returning *`,
    {
      id,
      firstName,
      middleName: middleName || null,
      lastName: lastName || null,
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

export function updateOrInsertUser({
  user_id: id, given_name: firstName, middle_name: middleName, family_name: lastName,
  gender, picture, picture_large: pictureLarge, link, email,
  logins_count: loginCount, created_at: createdAt, last_login: lastLogin
})
{
  return Knex.transaction(trx => {
    upsertUser(trx, {id, firstName, middleName, lastName, loginCount, createdAt, lastLogin})
      .then(() => upsertUserDetails(trx, {id, email, link, picture, pictureLarge, gender}))
      .then(trx.commit)
      .catch(trx.rollback);
  })
}
