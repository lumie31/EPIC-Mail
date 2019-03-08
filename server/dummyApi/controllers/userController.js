import Users from '../models/users';
// import validateUser from '../middlewares/validateUser';

// const userExist = validateUser.checkIfUserExists;
class UserController {
  /**
  * @method createUser
  * @description Create a new user account
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
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
    return response.status(201).json({
      status: 201,
      data: {
        token: 'xyz123',
      },
    });
  }

  /**
  * @method signin
  * @description Sign in a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof UserController
  */

  static signin(request, response) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!password) {
      return response.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

    const User = Users.find(user => user.email === request.body.email);
    if (User) {
      return response.status(200).json({
        status: 200,
        data: [{
          token: 'xyz123',
        }],
      });
    }
    return response.status(404).json({
      status: 404,
      error: 'User not found',
    });
  }
}

export default UserController;
