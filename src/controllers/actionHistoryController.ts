import { Request, Response } from 'express';
import { actionHistoryService } from '../services/actionHistoryService';

export const actionHistoryController = {
  async getUserHistory(req: Request, res: Response) {
    try {
      const userId = parseInt(req.query.userId as string);
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const history = await actionHistoryService.getUserHistory(userId, page, limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async createAction(req: Request, res: Response) {
    try {
      const { userId, action, timestamp } = req.body;
      const newAction = await actionHistoryService.createAction(userId, action, timestamp);
      res.status(201).json(newAction);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};
