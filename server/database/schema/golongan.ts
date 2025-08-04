import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const golongan = pgTable('golongan', {
  id: serial('id').primaryKey(),
  golongan: text('golongan').notNull(),
});
