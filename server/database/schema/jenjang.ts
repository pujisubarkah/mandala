import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const jenjang = pgTable('jenjang', {
  id: integer('id').primaryKey().notNull(),
  nm_jenjang: text('nm_jenjang').notNull(),
});
