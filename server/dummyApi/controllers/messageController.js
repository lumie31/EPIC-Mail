import Messages from '../models/messages';

class MessageController {
  /**
  * @method allReceivedEmails
  * @description Get all received emails for a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static allReceivedEmails(request, response) {
    if (!Messages) {
      return response.status(404).json({
        message: 'No messages here',
      });
    }
    return response.status(200).json({
      message: 'All Emails received successfully',
      Messages,
    });
  }

  /**
  * @method allUnreadEmails
  * @description Get all unread emails for a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static allUnreadEmails(request, response) {
    const messages = Messages.find(message => message.status === 'unread');
    if (messages) {
      return response.status(200).json({
        message: 'Unread emails',
        messages,
      });
    }
    return response.status(404).json({
      message: 'Not found',
    });
  }

  /**
  * @method allSentEmails
  * @description Get all emails sent by a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static allSentEmails(request, response) {
    const messages = Messages.find(message => message.status === 'sent');
    if (messages) {
      return response.status(200).json({
        message: 'Sent emails',
        messages,
      });
    }
    return response.status(404).json({
      message: 'Not found',
    });
  }

  /**
  * @method sendEmail
  * @description Send email to individuals
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static sendEmail(request, response) {
    const { subject, message } = request.body;
    if (!subject) {
      return response.status(400).json({
        message: 'Subject is required',
      });
    }
    if (!message) {
      return response.status(400).json({
        message: 'Message is required',
      });
    }

    const data = {
      id: Messages.length + 1,
      subject,
      message,
      createdOn: new Date(),
      parentMessageId: 1,
      status: 'sent',
    };

    Messages.push(data);
    return response.status(201).json({
      status: 201,
      data: [
        {
          id: data.id,
          subject: data.subject,
          message: data.message,
          createdOn: data.createdOn,
          parentMessageId: data.parentMessageId,
          status: data.status,
        },
      ],
    });
  }

  /**
  * @method getSpecificEmail
  * @description Get a specific user's email
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static getSpecificEmail(request, response) {
    const { id } = request.params;

    const mail = Messages.find(message => message.id === parseInt(id, 10));

    return response.status(200).send({
      status: 200,
      data: mail,
    });
  }

  /**
  * @method deleteMessage
  * @description Delete a specific messages
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static deleteMessage(request, response) {
    const { id } = request.params;
    const mail = Messages
      .find(message => message.id === parseInt(id, 10));
    if (!mail) {
      return response.status(404).json({
        status: 404,
        error: 'Message with given id not found',
      });
    }
    const index = Messages.indexOf(mail);
    Messages.splice(index, 1);
    return response.status(200).json({
      status: 200,
      message: 'Message with the given id has been deleted',
    });
  }
}

export default MessageController;
