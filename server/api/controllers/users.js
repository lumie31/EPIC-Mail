import jwt from 'jsonwebtoken';
import { hashSync, compareSync, genSaltSync } from 'bcryptjs';
import moment from 'moment';
import db from './index';

require('dotenv').config();

const salt = genSaltSync(10);

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


  static async createUser(request, response) {
    const {
      email, firstName, lastName, password,
    } = request.body;
    // console.log(request.body);
    const pwd = hashSync(password, salt);
    const query = `INSERT INTO Users(
      email,
      firstname,
      lastname,
      password,
      createdOn
    ) VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const values = [
      email,
      firstName,
      lastName,
      pwd,
      moment(new Date()),
    ];
    try {
      const { rows: user } = await db.query(query, values);
      // const user = rows[0];
      const token = jwt.sign({
        id: user[0].id,
        email: user[0].email,
      }, secret);
      return response.status(201).json({
        status: 201,
        data: {
          token,
          email: user[0].email,
          firstName: user[0].firstname,
          lastName: user[0].lastname,
          createdOn: user[0].createdon,
        },
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error,
      });
    }
  }

  /**
   * signin user
   * @param {object} request express request  object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof UserController
   */
  static async signin(request, response) {
    const { email, password } = request.body;

    const query = 'Select * from Users where email = $1';

    const values = [email];
    try {
      const { rows: user } = await db.query(query, values);
      if (!user[0]) {
        return response.status(400).json({
          status: 400,
          error: 'User does not exist',
        });
      }
      const pwdOk = compareSync(password, user[0].password);
      if (pwdOk) {
        const token = jwt.sign({
          id: user[0].id,
          email: user[0].email,
        }, secret);
        return response.status(200).json({
          status: 200,
          data: {
            token,
            email: user[0].email,
          },
        });
      }
      return response.status(401).json({
        status: 401,
        error: 'Email or Password is Incorrect',
      });
    } catch (error) {
      return response.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default UserController;
