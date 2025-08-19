import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { pendidikan } from './schema/pendidikan';
import { golongan } from './schema/golongan';

// Pool PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

// Instance drizzle ORM
export const db = drizzle(pool);

// Contoh: import { db } from '@/server/database' lalu gunakan db.select(...)
// Jangan jalankan koneksi di top-level, biarkan pool dan db digunakan di handler/server

