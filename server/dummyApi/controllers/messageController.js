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
}

export default MessageController;
