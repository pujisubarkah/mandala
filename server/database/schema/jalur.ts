import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const jalur = pgTable('jalur', {
  id: integer('id').primaryKey().notNull(),
  jalur_pengangkatan: text('jalur_pengangkatan').notNull(),
});
