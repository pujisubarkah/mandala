import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const jns_kelamin = pgTable('jns_kelamin', {
  id: integer('id').primaryKey().notNull(),
  jns_kelamin: text('jns_kelamin').notNull(),
});
