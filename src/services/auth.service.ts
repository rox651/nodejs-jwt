import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt';
import { NewUser, User } from '../types';

export const AuthService = {
  register: async (userData: NewUser): Promise<Omit<User, 'password'>> => {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const { password:_, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  login: async (email: string, pass: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.id, role: user.role as 'admin' | 'docente' });
    
    const { password:_, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  },
};
