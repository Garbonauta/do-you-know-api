
exports.up = function(knex, Promise) {
  return knex
    .schema
    .createTable( 'groups', groupTable => {
      groupTable.increments('group_id');
      groupTable.string('name', 50).notNullable();
      groupTable.string('created_by', 50).notNullable();
      groupTable.timestamp('created_date').notNullable();
    })

    .createTable('users_groups', userGroupsTable => {
      userGroupsTable.string('user_id', 50).references('user_id').inTable('users');
      userGroupsTable.integer('group_id').references('group_id').inTable('groups');
      userGroupsTable.boolean('favorite');
      userGroupsTable.primary(['user_id', 'group_id']);
    })

};

exports.down = function(knex, Promise) {
  return knex
};
