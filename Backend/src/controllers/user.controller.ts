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


export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  } else {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const userProfile = await userService.getUserProfile(token);

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    return res.status(200).json({ message: 'User profile retrieved successfully', userProfile });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ message: 'Internal server error', error: errorMessage });
    // or optionally: next(err);
  }
};
