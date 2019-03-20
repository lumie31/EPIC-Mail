import moment from 'moment';
import db from './index';

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
  static async sendEmail(req, res) {
    const { email } = req.body;
    const getReceiverId = 'select * from Users where email=$1';
    const text = `INSERT INTO
      Messages(subject, message, senderId, createdOn, receiverId, status)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const sentQuery = 'INSERT into Sent(senderId, messageId, createdOn) values($1, $2, $3) returning *';
    const inboxQuery = 'INSERT into Inbox(receiverId, messageId, createdOn) values($1, $2, $3) returning *';

    try {
      await db.query('BEGIN');
      const receiver = await db.query(getReceiverId, [email]);
      const { rows } = await db.query(text, [
        req.body.subject,
        req.body.message,
        req.decoded.id,
        moment().format(),
        receiver.rows[0].id,
        'sent',
      ]);
      await db.query(sentQuery, [rows[0].senderid, rows[0].id, rows[0].createdon]);
      await db.query(inboxQuery, [rows[0].receiverid, rows[0].id, rows[0].createdon]);
      await db.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      await db.query('ROLLBACK');
      return res.status(400).send(error);
    } finally {
      db.release();
    }
  }

  /**
   * Get all received emails for a user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static async allReceivedEmails(req, res) {
    const { id } = req.decoded;
    const text = `select * from Inbox INNER JOIN Messages ON Inbox.messageid = messages.id WHERE Inbox.receiverid = '${id}'`;

    try {
      const { rows } = await db.query(text);

      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get all unread emails for a user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static async allUnreadEmails(req, res) {
    const { id } = req.decoded;
    const text = `select * from Inbox INNER JOIN Messages ON Inbox.messageid = messages.id WHERE Inbox.receiverid = '${id}' and status='sent' `;

    try {
      const { rows } = await db.query(text);

      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get all emails sent by a user
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static async allSentEmails(req, res) {
    const { id } = req.decoded;
    const text = `select * from Sent INNER JOIN Messages ON Sent.messageid = messages.id WHERE Sent.senderid = '${id}'`;

    try {
      const { rows } = await db.query(text);

      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get a specific user's email
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof messageController
   */
  static async getSpecificEmail(req, res) {
    const { id } = req.decoded;
    const { messageid } = req.params;
    const text = `select * from Messages WHERE messages.id = '${messageid} and receiverid = ${id}`;

    try {
      const { rows } = await db.query(text);

      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
  * @method deleteMessage
  * @description Delete an email in a user's inbox
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @returns {object} JSON response
  * @memberof MessageController
  */

  static async deleteMessage(req, res) {
    const { id } = req.decoded;
    const { messageid } = req.params;
    const text = `select * from Inbox WHERE messageid = '${messageid} and receiverid = ${id}`;

    try {
      const { rows } = await db.query(text);
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default MessageController;
