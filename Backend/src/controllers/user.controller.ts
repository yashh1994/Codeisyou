import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.services.ts';


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }


    

    if (username === 'Alice' && password === 'password123') {
      res.json({ message: 'Login successful', token: 'dummy-jwt-token' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
};

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password , name} = req.body;
    if (!username || !password || !name) throw new Error('Username, password and name are required');

    res.status(201).json({ message: `User ${username} signed up successfully.` });
  } catch (err) {
    next(err);
  }
};