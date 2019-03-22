import db from './index';

/**
 * @class groupController
 */
class GroupController {
  /**
   * Create a new group
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof groupController
   */
  static async createGroup(req, res) {
    const { id } = req.decoded;
    const { groupname } = req.body;

    try {
      await db.query('BEGIN');
      const text = 'INSERT INTO Groups(name, createdby) VALUES($1, $2) returning *';
      const { rows } = await db.query(text, [groupname, id]);

      const groupMemberQuery = 'INSERT INTO Group_members(groupId, memberId, role) VALUES($1, $2, $3) returning *';
      const groupmember = await db.query(groupMemberQuery, [rows[0].id, id, 'admin']);

      await db.query('COMMIT');
      const response = {
        id: groupmember.rows[0].groupid,
        name: rows[0].name,
        role: groupmember.rows[0].role,
      };

      return res.status(201).json({
        status: 201,
        data: response,
      });
    } catch (error) {
      await db.query('ROLLBACK');
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    } finally {
      // db.release();
    }
  }

  /**
   * Add user to group
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof groupController
   */
  static async addUserToGroup(req, res) {
    const { id } = req.decoded;
    const { groupId } = req.params;
    const { body } = req;

    try {
      const text = 'SELECT * FROM Group_members WHERE (groupId, memberId) = ($1, $2)';
      const { rows } = await db.query(text, [groupId, id]);

      // check if user is an admin
      if (rows.length === 0 || rows[0].role === 'user') {
        return res.status(403).json({
          status: 403,
          error: 'You cannot add users to a group',
        });
      }

      const userQuery = 'SELECT * FROM users WHERE email = $1';
      const user = await db.query(userQuery, [body.email]);

      // check if the user exists in our users db
      if (user.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }

      const userExistQuery = 'SELECT * FROM group_members WHERE (groupId, memberId) = ($1, $2)';
      const userExist = await db.query(userExistQuery, [groupId, user.rows[0].id]);
      // check if user is already a member of the group
      if (userExist.rows.length > 0) {
        return res.status(409).json({
          status: 409,
          error: 'user already a group member',
        });
      }

      const text2 = 'INSERT INTO group_members(groupId, memberId, role) VALUES($1, $2, $3)';
      await db.query(text2, [groupId, user.rows[0].id, body.role]);

      const responseQuery = 'SELECT * FROM group_members WHERE groupId = $1';
      const response = await db.query(responseQuery, [groupId]);

      return res.status(201).json({
        status: 201,
        data: response.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  /**
   * User can delete a group they own
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof groupController
   */
  static async deleteSpecificGroup(req, res) {
    const { id } = req.decoded;
    const { groupId } = req.params;

    // To delete a group you must have created that group
    const text = 'SELECT * FROM group_members WHERE (groupId, memberId, role) = ($1, $2, $3)';
    const { rows } = await db.query(text, [groupId, id, 'admin']);

    // check if user is an admin
    if (!rows[0]) {
      return res.status(400).json({
        status: 400,
        error: 'You cannot delete group',
      });
    }
    try {
      await db.query('BEGIN');
      const query = 'DELETE FROM groups_members WHERE groupId = $1';
      await db.query(query, [groupId]);

      const text2 = 'DELETE FROM groups WHERE groups.id = $1';
      await db.query(text2, [groupId]);
      await db.query('COMMIT');

      return res.status(200).json({
        status: 200,
        data: {
          message: 'Group deleted successfully',
        },
      });
    } catch (error) {
      await db.query('ROLLBACK');
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    } finally {
      db.release();
    }
  }

  /**
   * Delete user from group
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof groupController
   */
  static async deleteUserFromGroup(req, res) {
    const { id } = req.decoded;
    const { groupId, userId } = req.params;
    try {
      const text = 'SELECT * FROM group_members WHERE (groupId, memberId) = ($1, $2)';
      const { rows } = await db.query(text, [groupId, id]);

      // check if user is an admin
      if (rows.length === 0 || rows[0].role === 'user') {
        return res.status(403).json({
          status: 403,
          error: 'You cannot delete a user from this group',
        });
      }

      const userExistQuery = 'SELECT * FROM group_members WHERE (groupId, memberId) = ($1, $2)';
      const userExist = await db.query(userExistQuery, [groupId, userId]);
      // check if user is member of the group
      if (userExist.rows.length === 0) {
        return res.status(409).json({
          status: 409,
          error: 'user not a group member',
        });
      }

      const query2 = 'DELETE FROM groups_members WHERE (groupId, memberId) = ($1, $2) ';
      await db.query(query2, [groupId, userId]);

      return res.status(201).json({
        status: 201,
        data: {
          message: 'User have been deleted successfully',
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  /**
   * Get all groups
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns {json} json
   * @memberof groupController
   */
  static async getAllGroups(req, res) {
    const { id } = req.decoded;

    try {
      const text = 'SELECT groups.id, groups.name, group_members.role FROM groups LEFT JOIN group_members ON group_members.groupid = groups.id WHERE (group_members.memberid) = ($1)';
      const { rows } = await db.query(text, [id]);

      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }
}

export default GroupController;
