import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('🔥 Error:', err.message || err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
