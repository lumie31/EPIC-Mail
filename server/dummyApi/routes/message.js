import express from 'express';
import MessageController from '../controllers/messageController';

const messageRouter = express.Router();

messageRouter.post('/messages', MessageController.sendEmail);
messageRouter.get('/messages', MessageController.allReceivedEmails);
messageRouter.get('/messages/unread', MessageController.allUnreadEmails);
messageRouter.get('/messages/sent', MessageController.allSentEmails);
messageRouter.get('/messages/:id', MessageController.getSpecificEmail);
messageRouter.delete('/messages/:id', MessageController.deleteMessage);

export default messageRouter;
