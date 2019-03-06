import Messages from '../models/messages';

class MessageController {
  /**
   * @description Gets all received emails for a user
   *
   * @static allReceivedEmails
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof messageController
   * @returns {object} List of all received emails
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
   * @description Gets all unread emails for a user
   *
   * @static allUnreadEmails
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof messageController
   * @returns {object} List of all unread emails
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
   * @description Gets all sent emails by a user
   *
   * @static allSentEmails
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof messageController
   * @returns {object} List of all sent emails
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
   * @description Send email to individuals
   *
   * @static sendEmail
   * @param {object} request Request object
   * @param {object} response Response object
   * @memberof messageController
   * @returns {object} created object
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
    return response.status(200).send({
      status: response.statusCode,
      message: 'Message with the given id has been deleted',
    });
  }
}

export default MessageController;
