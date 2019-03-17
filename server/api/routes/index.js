import express from 'express';
import UserController from '../controllers/users';
import validateUser from '../../dummyApi/middlewares/validateUser';

const userRouter = express.Router();

userRouter.post(
  '/auth/signup',
  validateUser.validateSignup,
  UserController.createUser,
);

userRouter.post('/auth/login', validateUser.validateLogin, UserController.signin);

export default userRouter;
