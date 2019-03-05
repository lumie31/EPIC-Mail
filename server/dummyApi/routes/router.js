import express from 'express';
import UserController from '../controllers/userController';
import MessageController from '../controllers/messageController';
import validateUser from '../middlewares/validateUser';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello world');
});

router.post(
  '/auth/signup',
  validateUser.validateSignup,
  UserController.createUser,
);
router.post('/auth/login', validateUser.validateLogin, UserController.signin);
router.get('/messages', MessageController.allReceivedEmails);
router.get('/messages/unread', MessageController.allUnreadEmails);
router.get('/messages/sent', MessageController.allSentEmails);
router.post('/messages', MessageController.sendEmail);

export default router;
