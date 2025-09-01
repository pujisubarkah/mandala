import { pgTable, bigint, text, smallint, integer, timestamp } from 'drizzle-orm/pg-core';
import { categories } from './categories';

export const video = pgTable('videos', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  video_url: text('video_url').notNull(),
  date_year: smallint('date_year'),
  category_id: integer('category_id').references(() => categories.id),
  color: text('color'),
  bg_color: text('bg_color'),
  icon: text('icon'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Video = typeof video.$inferSelect;
export type NewVideo = typeof video.$inferInsert;
