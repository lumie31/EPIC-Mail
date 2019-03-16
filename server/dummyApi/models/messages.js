const Messages = [
  {
    id: 1,
    createdOn: new Date(),
    subject: 'Hello',
    message: 'Can we meet to talk about the issue you mentioned the other day',
    senderId: 1,
    receiverId: 3,
    parentMessageId: 1,
    status: 'read',
  },
  {
    id: 2,
    createdOn: new Date(),
    subject: 'Hi',
    message: 'Lorem ipsum shit',
    senderId: 2,
    receiverId: 3,
    parentMessageId: 2,
    status: 'draft',
  },
  {
    id: 3,
    createdOn: new Date(),
    subject: 'Holla',
    message: 'Would like to get to know you ma',
    senderId: 3,
    receiverId: 3,
    parentMessageId: 3,
    status: 'sent',
  },
  {
    id: 4,
    createdOn: new Date(),
    subject: 'Holla',
    message: 'Would like to get to know you ma',
    senderId: 4,
    receiverId: 3,
    parentMessageId: 3,
    status: 'unread',
  },
];

export default Messages;
