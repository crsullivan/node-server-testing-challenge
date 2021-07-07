const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
};

function insert(quote) {
  return db('quotes').insert(quote, 'id').then(([id]) => {
    return db('quotes')
      .where({ id })
      .first();
  });
}

function update(id, changes) {
    return db('quotes')
      .where({ id })
      .update(changes, '*');
  }

function remove(id) {
    return db('quotes')
      .where({ id })
      .del();
  }

function getAll() {
  return db('quotes');
}

function findById(id) {
  return null;
}
