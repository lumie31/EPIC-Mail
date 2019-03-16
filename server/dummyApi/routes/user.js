import express from 'express';
import UserController from '../controllers/userController';
import validateUser from '../middlewares/validateUser';

const userRouter = express.Router();

userRouter.post(
  '/auth/signup',
  validateUser.validateSignup,
  UserController.createUser,
);

userRouter.post('/auth/login', validateUser.validateLogin, UserController.signin);

export default userRouter;
