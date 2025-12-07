import { db } from '../db';
import { products } from '../db/schema';
import { inArray } from 'drizzle-orm';
import { Product, NewProduct } from '../types';

export const ProductRepository = {
  create: async (productData: NewProduct): Promise<Product> => {
    const result = await db.insert(products).values(productData).returning();
    return result[0];
  },

  findAll: async (): Promise<Product[]> => {
    return await db.select().from(products);
  },

  findByIds: async (ids: number[]): Promise<Product[]> => {
    if (ids.length === 0) return [];
    return await db.select().from(products).where(inArray(products.id, ids));
  },
};
