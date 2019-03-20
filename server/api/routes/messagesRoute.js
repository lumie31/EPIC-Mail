import express from 'express';
import MessageController from '../controllers/messages';
import verifyToken from '../middlewares/verifyToken';

const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, MessageController.sendEmail);
messageRouter.get('/messages', verifyToken, MessageController.allReceivedEmails);
messageRouter.get('/messages/unread', verifyToken, MessageController.allUnreadEmails);
messageRouter.get('/messages/sent', verifyToken, MessageController.allSentEmails);
messageRouter.get('/messages/:messageId', verifyToken, MessageController.getSpecificEmail);
messageRouter.delete('/messages/:messageId', verifyToken, MessageController.deleteMessage);

export default messageRouter;
