import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';

import pool from '../../../db';

require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

const secret = process.env.SECRET;

class UserController {
  /**
   * creates new user
   * @class UserController
   * @param {object} request express request object
   * @param {object} response express response object
   * @returns {json} json
   * @memberof UserController
   */
  static createUser(request, response) {
    const data = {
      email: request.body.email,
      firstname: request.body.firstName,
      lastname: request.body.lastName,
      password: bcrypt.hashSync(request.body.password, salt),
      createdOn: moment().format(),
    };

    pool.connect((err, client, done) => {
      const query = `INSERT INTO Users(
        email,
        firstname,
        lastname,
        password,
        createdOn
      ) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const values = Object.values(data);

      client.query(query, values, (error, result) => {
        done();
        if (error) {
          if (error.code === '23505') {
            return response.status(400).json({
              status: 400,
              error: 'Email already exist',
            });
          }
          return response.status(400).json({
            status: 400,
            error,
          });
        }
        const user = result.rows[0];
        const token = jwt.sign({
          id: user.id,
          email: user.email,
        }, secret);
        // eslint-disable-next-line camelcase
        const { password, createdOn, ...userdata } = user;

        return response.status(201).json({
          status: 201,
          data: {
            token,
            user: userdata,
          },
        });
      });
    });
  }

  /**
   * signin user
   * @param {object} request express request  object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */
  static signin(request, response) {
    const data = {
      email: request.body.email,
      password: request.body.password,
    };

    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [data.email];

      client.query(query, values, (error, result) => {
        done();
        const user = result.rows[0];
        if (!user) {
          return response.status(400).json({
            status: 400,
            error: 'Email or Password is Incorrect',
          });
        }
        if (bcrypt.compareSync(data.password, user.password)) {
          const token = jwt.sign({
            id: user.id,
            email: user.email,
          }, secret);
          const {
            // eslint-disable-next-line camelcase
            password, createdOn, updatedOn, ...userdata
          } = user;
          return response.status(200).json({
            status: 200,
            data: {
              token,
              user: userdata,
            },
          });
        }
        return response.status(400).json({
          status: 400,
          error: 'Email or Password is Incorrect',
        });
      });
    });
  }
}

export default UserController;
