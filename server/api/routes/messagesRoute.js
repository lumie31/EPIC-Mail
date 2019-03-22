import express from 'express';
import MessageController from '../controllers/messages';
import verifyToken from '../middlewares/verifyToken';
import validate from '../middlewares/validateMessage';

const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, validate.validateMessage, MessageController.sendEmail);
messageRouter.get('/messages', verifyToken, MessageController.allReceivedEmails);
messageRouter.get('/messages/unread', verifyToken, MessageController.allUnreadEmails);
messageRouter.get('/messages/sent', verifyToken, MessageController.allSentEmails);
messageRouter.get('/messages/:messageid', verifyToken, validate.validateParams, MessageController.getSpecificEmail);
messageRouter.delete('/messages/:messageid', verifyToken, MessageController.deleteMessage);

export default messageRouter;
