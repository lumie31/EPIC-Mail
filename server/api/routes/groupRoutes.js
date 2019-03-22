import express from 'express';
import GroupController from '../controllers/groups';
import verifyToken from '../middlewares/verifyToken';

const groupRouter = express.Router();

groupRouter.get('/groups', verifyToken, GroupController.getAllGroups);
groupRouter.post('/groups', verifyToken, GroupController.createGroup);
groupRouter.post('/groups/:groupId', verifyToken, GroupController.addUserToGroup);
groupRouter.delete('/groups/:groupId/users/:userId', verifyToken, GroupController.deleteUserFromGroup);
groupRouter.delete('/groups/:groupId', verifyToken, GroupController.deleteSpecificGroup);

export default groupRouter;
