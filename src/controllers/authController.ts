import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await AuthService.register({ name, email, password, role: role || 'docente' });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
