import Validator from 'validatorjs';

import Users from '../models/users';

export default class validateUsers {
  static validateSignup(request, response, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, firstName, lastName, password, confirmPassword,
    } = request.body;

    const rules = {
      firstName: 'required|alpha|min:3|max:30|string',
      lastName: 'required|alpha|min:3|max:30|string',
      email: 'required|email',
      password: 'required|alpha_num|min:6',
      confirmPassword: 'required|same:password',
    };

    const validation = new Validator(request.body, rules);

    if (validation.fails()) {
      return response.status(422).json({
        status: 422,
        error: validation.errors.errors,
      });
    }
    const userExist = Users.find(user => user.email === email);
    if (userExist) {
      return response.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }
    request.body.email = email;
    request.body.firstName = firstName;
    request.body.lastName = lastName;
    request.body.password = password;
    request.body.confirmPassword = confirmPassword;
    return next();
  }

  static validateLogin(request, response, next) {
    const { email, password } = request.body;

    const rules = {
      email: 'required|email',
      password: 'required|alpha_num',
    };

    const validation = new Validator(request.body, rules);

    if (validation.fails()) {
      return response.status(422).json({
        status: 422,
        error: validation.errors.errors,
      });
    }
    request.body.email = email;
    request.body.password = password;

    return next();
  }
}
