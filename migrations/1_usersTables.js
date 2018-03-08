
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable( 'users', usersTable => {
      usersTable.string( 'user_id', 50 ).primary().notNullable();
      usersTable.string( 'first_name', 50 ).notNullable();
      usersTable.string( 'middle_name', 50 );
      usersTable.string( 'last_name', 50 );
      usersTable.string( 'full_name', 150).notNullable();
      usersTable.boolean( 'super_user');
      usersTable.integer( 'login_count');
      usersTable.timestamp( 'created_at');
      usersTable.timestamp( 'last_login');
    })

    .createTable('users_details', usersDetailsTable => {
      usersDetailsTable.string( 'user_id', 50 ).primary().references('user_id').inTable('users');
      usersDetailsTable.string( 'email', 150 ).notNullable();
      usersDetailsTable.string( 'link', 200 ).notNullable();
      usersDetailsTable.string( 'picture', 200).notNullable();
      usersDetailsTable.string( 'picture_large', 200).notNullable();
      usersDetailsTable.string( 'gender', 20 );
    })
};

exports.down = function(knex, Promise) {
  return knex
    .dropTable('users_details')
    .dropTable('users');

};
