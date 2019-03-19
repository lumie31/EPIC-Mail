import moment from 'moment';
import pool from '../models/database';

/**
 * @class messageController
 */
class MessageController {
  /**
   * Send email to individuals
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  // eslint-disable-next-line consistent-return
  static sendEmail(request, response) {
    const { receiver, subject, message } = request.body;
    if (!receiver) {
      return response.status(406).json({
        status: 406,
        error: 'Receiver is required',
      });
    }
    if (!subject) {
      return response.status(406).json({
        status: 406,
        error: 'Subject is required',
      });
    }
    if (!message) {
      return response.status(406).json({
        status: 406,
        error: 'Message is required',
      });
    }
    const data = {
      subject: request.body.subject,
      message: request.body.message,
      createdOn: moment().format(),
      senderEmail: request.decoded.email,
      receiverEmail: request.body.receiver,
      status: 'sent',
    };

    pool.connect((err, client, done) => {
      const query = `INSERT INTO Messages(
        subject,
        message,
        createdOn,
        senderEmail,
        receiverEmail,
        status
        ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = Object.values(data);

      client.query(query, values, (error, result) => {
        done();
        if (error) {
          return response.status(400).json({
            status: 400,
            error: 'Error in sending message',
          });
        }
        return response.status(201).json({
          status: 201,
          data: {
            message: 'Message sent successfully',
            id: result.rows[0].id,
          },
        });
      });
    });
  }

  /**
   * Get all received emails for a user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static allReceivedEmails(request, response) {
    pool.connect((err, client, done) => {
      const query = `SELECT * FROM Messages where receiveremail='${request.decoded.email}' and status='read'`;
      client.query(query, (error, result) => {
        done();
        if (error) {
          return response.status(400).json({
            status: 400,
            error: 'Error getting received mails',
          });
        }
        return response.status(200).json({
          status: 200,
          data: result.rows[0],
        });
      });
    });
  }

  /**
   * Get all unread emails for a user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static allUnreadEmails(request, response) {
    pool.connect((err, client, done) => {
      const query = `SELECT * FROM Messages where receiveremail='${request.decoded.email}' and status='unread'`;
      client.query(query, (error, result) => {
        done();
        if (error) {
          return response.status(400).json({
            status: 400,
            error: 'Error getting unread mails',
          });
        }
        return response.status(200).json({
          status: 200,
          data: result.rows[0],
        });
      });
    });
  }
}

export default MessageController;
