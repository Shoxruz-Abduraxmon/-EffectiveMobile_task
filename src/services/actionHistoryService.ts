import {Pool} from 'pg';
import { actionHistory } from '../models/actionHistory';

const pool = new Pool({
  user: 'user_actions',
  host: 'localhost',
  database: 'task', 
  password: 'shox4443', 
  port: 5432,
});

export const actionHistoryService = {
  async getUserHistory(userId: number, page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const query = {
        text: 'SELECT * FROM user_actions WHERE userId = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3',
        values: [userId, limit, offset],
      };
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error('Failed to fetch user history');
    }
  },

  async createAction(userId: number, action: string, timestamp: string): Promise<actionHistory> {
    try {
      const query = {
        text: 'INSERT INTO user_actions (userId, action, timestamp) VALUES ($1, $2, $3) RETURNING *',
        values: [userId, action, timestamp],
      };
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error('Failed to create action history');
    }
  },
};
