import Users from '../models/users';
import validateUser from '../middlewares/validateUser';

const userExist = validateUser.checkIfUserExists;
class UserController {
  /**
   * Creates a user
   * * @api {post} /api/user Create user
   *
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {json} created object
   * @memberof userController
   */

  static createUser(request, response) {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    } = request.body;

    if (!email) {
      return response.status(400).json({
        message: 'Email is required',
      });
    }
    if (!firstName) {
      return response.status(400).json({
        message: 'First name is required',
      });
    }
    if (!lastName) {
      return response.status(400).json({
        message: 'last name is required',
      });
    }
    if (!password) {
      return response.status(400).json({
        message: 'password is required',
      });
    }
    if (password !== confirmPassword) {
      return response.status(400).json({
        message: 'passwords do not match',
      });
    }
    const data = {
      email,
      firstName,
      lastName,
      password,
    };

    Users.push(data);
    // if (userExist) {
    //   return response.status(409).json({
    //     status: 409,
    //     error: 'User already exists',
    //   });
    // }
    return response.status(201).json({
      status: 201,
      data: [{
        token: 'xyz123',
        data,
      }],
    });
  }

  /**
   * signin a user
   * * @api {post} /api/user signin user
   *
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {json} created object
   * @memberof userController
   */

  static signin(request, response) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({
        message: 'Email is required',
      });
    }
    if (!password) {
      return response.status(400).json({
        message: 'Password is required',
      });
    }

    const User = Users.find(user => user.email === request.body.email);
    if (User) {
      return response.status(200).json({
        status: 200,
        data: [{
          token: 'xyz123',
          User,
        },
        ],
      });
    }
    return response.status(404).json({
      status: 404,
      message: 'User not found',
    });
  }
}

export default UserController;
