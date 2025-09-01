import { pgTable, bigint, varchar } from 'drizzle-orm/pg-core';

export const download_tags = pgTable('download_tags', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  download_id: bigint('download_id', { mode: 'number' }),
  tag: varchar('tag', { length: 255 })
});

export type DownloadTag = typeof download_tags.$inferSelect;
export type NewDownloadTag = typeof download_tags.$inferInsert;
