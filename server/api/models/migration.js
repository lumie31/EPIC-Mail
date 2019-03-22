// import pool from './database';

// const createTables = () => {
//   const sql = `
//   DROP TABLE IF EXISTS Inbox;
//   DROP TABLE IF EXISTS Sent;
//   DROP TABLE IF EXISTS Contacts;
//   DROP TABLE IF EXISTS Users CASCADE;
//   DROP TABLE IF EXISTS Messages CASCADE;


//   CREATE TABLE Users(
//       id SERIAL PRIMARY KEY,
//       email VARCHAR(128) UNIQUE NOT NULL,
//       firstname VARCHAR(128) NOT NULL,
//       lastname VARCHAR(128) NOT NULL,
//       password VARCHAR(128) NOT NULL,
//       createdOn DATE NOT NULL,
//       updatedOn DATE
//   );
//   CREATE TABLE Messages(
//       id SERIAL PRIMARY KEY,
//       subject VARCHAR(128) NOT NULL,
//       message TEXT NOT NULL,
//       createdOn DATE NOT NULL,
//       parentMessageId INTEGER NULL,
//       senderId INTEGER NOT NULL,
//       receiverId INTEGER NOT NULL,
//       status VARCHAR(128) NOT NULL
//   );
//   CREATE TABLE Contacts(
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(128) UNIQUE NOT NULL,
//     firstname VARCHAR(128) NOT NULL,
//     lastname VARCHAR(128) NOT NULL
// );
// CREATE TABLE Sent(
//   id SERIAL PRIMARY KEY,
//   senderId INTEGER NOT NULL,
//   messageId INTEGER NOT NULL,
//   createdOn DATE NOT NULL,
//   FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE,
//   FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE
//   );
//   CREATE TABLE Inbox(
//   id SERIAL PRIMARY KEY,
//   receiverId INTEGER NOT NULL,
//   messageId INTEGER ,
//   createdOn DATE NOT NULL,
//   FOREIGN KEY (receiverId) REFERENCES users (id) ON DELETE CASCADE,
//   FOREIGN KEY (messageId) REFERENCES messages (id) ON DELETE CASCADE
//   );
//   CREATE TABLE Groups(
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(128) NOT NULL
//     );
//     CREATE TABLE GroupMembers(
//   groupId SERIAL PRIMARY KEY,
//   memberId SERIAL
//   );
//   `;
//   pool.query(sql)
//     .then(() => {
//       // eslint-disable-next-line no-console
//       console.log('tables created');
//       pool.end();
//     })
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       console.log('error', err);
//       pool.end();
//     });
//   };
//   return createTables();

// // const dropDatabase = () => {
// //   pool.query('DROP TABLE IF EXISTS Users, Messages, Contacts, Sent, Inbox, Groups, GroupMembers')
// //     .then((res) => {
// //       console.log('Database dropped', res);
// //     });
// // };


// // module.exports = {
// //   dropDatabase,
// //   createTables,
// // };

// // eslint-disable-next-line import/no-extraneous-dependencies
// // require('make-runnable');
