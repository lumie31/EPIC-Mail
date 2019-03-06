import Users from '../models/users';

const validNameRegex = /^[A-Za-z]{3,30}$/;
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^[A-Za-z0-9]{6,}$/;

export default class validateUsers {
  static checkIfUserExists(request, response, next) {
    const userExist = Users.find(user => user.email === request.body);
    if (userExist) {
      return response.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    return next();
  }

  static validateSignup(request, response, next) {
    const {
      email, firstName, lastName, password,
    } = request.body;
    if (!(firstName && firstName.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'Please enter your firstname',
      });
    }
    if (!validNameRegex.test(firstName)) {
      return response.status(422).json({
        status: 422,
        error: 'First name must be between 3 and 30 characters',
      });
    }
    if (!(lastName && lastName.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'Please enter your lastname',
      });
    }
    if (!validNameRegex.test(lastName)) {
      return response.status(422).json({
        status: 422,
        error: 'Last name must be between 3 and 30 characters',
      });
    }
    if (!(email && email.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'Please enter your email',
      });
    }

    if (!emailRegex.test(email)) {
      return response.status(422).json({
        status: 422,
        error: 'Please enter a valid email',
      });
    }
    if (!(password && password.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'Please enter your password',
      });
    }

    if (!passwordRegex.test(password)) {
      return response.status(422).json({
        status: 422,
        error: 'Password must be a minimum of 6 alphanumeric characters',
      });
    }

    return next();
  }

  static validateLogin(request, response, next) {
    const { email, password } = request.body;

    if (!(email && email.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'email is required',
      });
    }
    if (!(password && password.trim().length)) {
      return response.status(422).json({
        status: 422,
        error: 'password is required',
      });
    }
    return next();
  }
}