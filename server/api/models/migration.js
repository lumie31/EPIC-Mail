import pool from './database';

const createTables = () => {
  const users = `CREATE TABLE IF NOT EXISTS
    Users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      created_at DATE NOT NULL,
      updated_at DATE NOT NULL
  )`;

  const messages = `CREATE TABLE IF NOT EXISTS
    Messages(
      id SERIAL PRIMARY KEY,
      created_at DATE NOT NULL,
      subject VARCHAR(128) NOT NULL,
      message TEXT NOT NULL,
      parentmessageid INTEGER NOT NULL,
      status VARCHAR(128) NOT NULL,
      user_id INTEGER NOT NULL
  )`;

  // eslint-disable-next-line import/no-named-as-default-member
  pool.query(messages)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('messages created', res);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

  pool.query(users)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log('users created', res);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error', err);
    });


  pool.end();
};

const dropDatabase = () => {
  pool.query('DROP TABLE IF EXISTS Users, Messages')
    .then((res) => {
      console.log('Database dropped', res);
    });
};


module.exports = {
  dropDatabase,
  createTables,
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');
