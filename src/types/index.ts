import { users, products } from '../db/schema';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export interface JwtPayload {
  id: number;
  role: 'admin' | 'docente';
  iat?: number;
  exp?: number;
}

