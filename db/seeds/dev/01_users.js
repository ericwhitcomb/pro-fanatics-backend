const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      username: 'eric',
      password: bcrypt.hashSync(process.env.DEV_PASSWORD, 6),
      email: 'eric.whitcomb@gmail.com',
      first_name: 'Eric',
      last_name: 'Whitcomb'
    },
    {
      username: 'larry',
      password: bcrypt.hashSync(process.env.DEV_PASSWORD, 6),
      email: 'whitcombl50@gmail.com',
      first_name: 'Larry',
      last_name: 'Whitcomb'
    }
  ]);
};
