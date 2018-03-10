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

function upsertUserDetails(trx, id, {email, link, picture, pictureLarge, gender}) {
  return trx.raw(
    `insert into users_details(user_id, email, link, picture, picture_large, gender)
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
      await upsertUserDetails(trx, user.id, user.details);
      trx.commit;
    } catch (exception) {
      trx.rollback;
      throw exception
    }
  })
}


export function getUser(id) {
  return Knex
    .select(
      'first_name as firstName',
      'last_name as lastName',
      'middle_name as middleName',
      'full_name as fullName',
      'super_user as superUser',
      'login_count as loginCount',
      'created_at as createdAt',
      'last_login as lastLogin')
    .from('users')
    .where('user_id', id)
}

export function getUserFriends(friends) {
  return Knex
    .select(
      'users.full_name as name',
      'users_details.picture',
      'users_details.link')
    .from('users')
    .innerJoin('users_details', 'users.user_id', 'users_details.user_id')
    .whereIn('users.user_id', friends);
}


export function getUserGroups(id) {
  return Knex
    .select(
      'groups.group_id as id',
      'groups.name',
      'users_groups.owner')
    .from('users_groups')
    .innerJoin('groups', 'groups.group_id', 'users_groups.group_id')
    .where('users_groups.user_id', id)
}

