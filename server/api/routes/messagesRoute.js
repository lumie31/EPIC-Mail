import express from 'express';
import MessageController from '../controllers/messages';
import verifyToken from '../middlewares/verifyToken';

const messageRouter = express.Router();

messageRouter.post('/messages', verifyToken, MessageController.sendEmail);

export default messageRouter;
