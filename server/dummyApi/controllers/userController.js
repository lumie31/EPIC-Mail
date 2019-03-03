import Users from '../models/users';

class UserController {
  /**
   * Creates a user
   * * @api {post} /api/user Create user
   *
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {json} created object
   * @memberof userControllers
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
    return response.status(200).json({
      message: 'user created',
      user: data,
    });
  }

  /**
   * signin a user
   * * @api {post} /api/user signin user
   *
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {json} created object
   * @memberof userControllers
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
        message: 'Successfully signed in',
        User,
      });
    }
    return response.status(404).json({
      message: 'User not found',
    });
  }
}

export default UserController;
