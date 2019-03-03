const Messages = [
  {
    id: 1,
    createdOn: new Date(),
    subject: 'Hello',
    message: 'Can we meet to talk about the issue you mentioned the other day',
    parentMessageId: 1,
    status: 'read',
  },
  {
    id: 2,
    createdOn: new Date(),
    subject: 'Hi',
    message: 'Lorem ipsum shit',
    parentMessageId: 2,
    status: 'draft',
  },
  {
    id: 3,
    createdOn: new Date(),
    subject: 'Holla',
    message: 'Would like to get to know you ma',
    parentMessageId: 3,
    status: 'sent',
  },
];

export default Messages;
