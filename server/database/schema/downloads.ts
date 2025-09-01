
import { pgTable, bigint, varchar, text, integer, date, timestamp } from 'drizzle-orm/pg-core';
import { download_categories } from './download_categories';
import { download_tags } from './download_tags';

export const downloads = pgTable('downloads', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  file_name: varchar('file_name', { length: 255 }),
  file_size: varchar('file_size', { length: 64 }),
  file_count: integer('file_count'),
  create_date: date('create_date'),
  last_modified: date('last_modified'),
  download_url: varchar('download_url', { length: 255 }),
  category_id: bigint('category_id', { mode: 'number' }), // relasi ke download_categories
  bg_color: varchar('bg_color', { length: 64 }),
  created_at: timestamp('created_at', { mode: 'date' }),
  updated_at: timestamp('updated_at', { mode: 'date' })
});

// TypeScript: relasi kategori dan tags
export type Download = typeof downloads.$inferSelect & {
  category?: typeof download_categories.$inferSelect,
  tags?: typeof download_tags.$inferSelect[]
};
export type NewDownload = typeof downloads.$inferInsert;
