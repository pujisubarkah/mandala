import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

export const roles = pgTable('role_id', {
  role_id: integer('role_id').primaryKey(),
  role_nama: varchar('role_nama', { length: 64 }).notNull()
});
