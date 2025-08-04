import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const pendidikan = pgTable('pendidikan', {
  id: serial('id').primaryKey(),
  pendidikan: text('pendidikan').notNull(),
});
