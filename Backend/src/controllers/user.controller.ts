import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.services';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const token = await userService.loginUser(email, password);
    return res.json({ message: 'Login successful', token });
    
  } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(401).json({ message: errorMessage });
  }
};

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, user_name, password, name } = req.body;

    if (!email || !user_name || !password || !name) {
      return res.status(400).json({ message: 'Email, user_name, password, and name are required' });
    }

    const result = await userService.signUpUser(email, password, name, user_name);

    if (!result) {
      return res.status(400).json({ message: 'User signup failed' });
    }

    const { user, token } = result;
    return res.status(201).json({ message: 'User signed up successfully', user, token });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: errorMessage, error: errorMessage });
  }
};
