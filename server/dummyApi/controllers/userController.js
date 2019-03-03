import Users from '../models/users';
/**
 * Creates a new user.
 * @class user
 */

class UserControllers {
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
}

export default UserControllers;
