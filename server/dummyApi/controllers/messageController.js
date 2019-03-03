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
   * @static allUnreadEmail
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
}

export default MessageController;
