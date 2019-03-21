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
    } = request.body;
    const data = {
      email,
      firstName,
      lastName,
      password,
    };

    Users.push(data);
    return response.status(201).json({
      status: 201,
      data: [{
        token: 'xyz123',
      }],
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

    const User = Users.find(user => user.email === email && user.password === password);
    if (User) {
      return response.status(200).json({
        status: 200,
        data: [{
          token: 'xyz123',
        }],
      });
    }
    return response.status(400).json({
      status: 400,
      error: 'Email or Password is Incorrect',
    });
  }
}

export default UserController;
