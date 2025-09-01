import { pgTable, bigint, varchar, text } from 'drizzle-orm/pg-core';

export const download_categories = pgTable('download_categories', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 64 }),
  bg_color: varchar('bg_color', { length: 64 })
});

export type DownloadCategory = typeof download_categories.$inferSelect;
export type NewDownloadCategory = typeof download_categories.$inferInsert;
