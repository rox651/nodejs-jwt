import { db } from '../src/db';
import { users, products } from '../src/db/schema';
import { sql } from 'drizzle-orm';

async function resetDb() {
  try {
    console.log('🗑️  Clearing all data...');
    await db.execute(sql`TRUNCATE TABLE ${users}, ${products} RESTART IDENTITY CASCADE`);
    console.log('✅ Database reset successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting DB:', error);
    process.exit(1);
  }
}

resetDb();

