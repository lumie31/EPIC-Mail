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
    const { receiverEmail } = req.body;

    try {
      await db.query('BEGIN');
      const getReceiverId = 'select * from Users where email=$1';
      const receiver = await db.query(getReceiverId, [receiverEmail]);
      if (receiver.rows.length === 0) {
        return res.status(400).json({
          status: 400,
          error: 'User does not exist',
        });
      }
      if (receiver.rows[0].id === req.decoded.id) {
        return res.status(400).json({
          status: 400,
          error: 'You cannot send a mail to yourself',
        });
      }
      // iif recceive doesn't exist ...
      const text = `INSERT INTO
      Messages(subject, message, senderId, createdOn, receiverId, status)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
      const { rows } = await db.query(text, [
        req.body.subject,
        req.body.message,
        req.decoded.id,
        moment().format(),
        receiver.rows[0].id,
        'sent',
      ]);

      const sentQuery = 'INSERT into Sent(senderId, messageId, createdOn) values($1, $2, $3) returning *';
      await db.query(sentQuery, [rows[0].senderid, rows[0].id, rows[0].createdon]);

      const inboxQuery = 'INSERT into Inbox(receiverId, messageId, createdOn) values($1, $2, $3) returning *';
      await db.query(inboxQuery, [rows[0].receiverid, rows[0].id, rows[0].createdon]);

      await db.query('COMMIT');
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      console.log('err', error);
      await db.query('ROLLBACK');
      return res.status(400).json({ error });
    } finally {
      // db.release();
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
      return res.status(200).json({
        status: 200,
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

      return res.status(200).json({
        status: 200,
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

      return res.status(200).json({
        status: 200,
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
    const messageid = parseInt(req.params.messageid, 10);
    // const { messageid } = req.params;
    console.log(typeof messageid);


    const text = `select * from Messages WHERE id = '${messageid}'`;

    try {
      const { rows } = await db.query(text);
      if (rows[0].senderid !== id && rows[0].receiverid !== id) {
        return res.status(401).json({
          status: 401,
          error: 'You are not authorized to view this email',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Message does not exist',
      });
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
    // const messageid = parseInt(req.params.messageid, 10);
    // const { messageid } = req.params;
    // const text = `delete * from Inbox WHERE messageid = '${messageid} and receiverid = ${id}`;
    const text = `delete * from Inbox INNER JOIN Messages ON Inbox.messageid = messages.id WHERE Inbox.receiverid = '${id}'`;
    // const text = `delete * from Messages WHERE id = '${messageid}'`;
    try {
      const { rows } = await db.query(text);
      console.log(rows);
      if (rows[0].senderid !== id && rows[0].receiverid !== id) {
        return res.status(401).json({
          status: 401,
          error: 'You are not authorized to delete this email',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default MessageController;
