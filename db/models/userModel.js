const bcrypt = require('bcryptjs');
const db = require('../dbConfig.js');

module.exports = {
  findAllUsers: () => {
    return db('users')
      .select('id', 'username', 'email', 'first_name', 'last_name');
  },

  findByEmail: email => {
    return db('users')
      .where('email', email)
      .first();
  },

  findById: id => {
    return db('users')
      .where('id', id)
      .first();
  },

  findByUsername: username => {
    return db('users')
      .where('username', username)
      .first();
  },

  insert: user => {
    return db('users').insert(user, 'id');
  },

  update: (uid, changes) => {
    return db('users')
      .where('id', uid)
      .update(changes);
  }
};