import express from 'express';
import UserController from '../controllers/userController';
import MessageController from '../controllers/messageController';
import validateUser from '../middlewares/validateUser';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to EPIC Mail',
  });
});

router.post(
  '/auth/signup',
  validateUser.validateSignup,
  UserController.createUser,
);
router.post('/messages', MessageController.sendEmail);
router.get('/messages', MessageController.allReceivedEmails);
router.get('/messages/unread', MessageController.allUnreadEmails);
router.get('/messages/sent', MessageController.allSentEmails);
router.get('/messages/:id', MessageController.getSpecificEmail);
router.post('/auth/login', validateUser.validateLogin, UserController.signin);
router.delete('/messages/:id', MessageController.deleteMessage);

export default router;
