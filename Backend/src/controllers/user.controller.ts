import { Request, Response, NextFunction } from 'express';

export const getAllUsers = async (_req: Request, res: Response) => {
  res.json({ users: ['Alice', 'Bob'] });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error('Name is required');
    res.status(201).json({ message: `User ${name} created.` });
  } catch (err) {
    next(err);
  }
};
