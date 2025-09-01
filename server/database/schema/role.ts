import { pgTable, bigint, varchar } from 'drizzle-orm/pg-core';

export const roles = pgTable('role_id', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 64 }).notNull()
});
