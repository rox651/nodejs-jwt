import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { User, NewUser } from '../types';

export const UserRepository = {
  findByEmail: async (email: string): Promise<User | null> => {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  },

  create: async (userData: NewUser): Promise<User> => {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  },
};
