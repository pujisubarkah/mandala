import { pgTable, bigint, varchar, text } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 64 }),
  bg_color: varchar('bg_color', { length: 64 })
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
