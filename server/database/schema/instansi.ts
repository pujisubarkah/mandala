import { pgTable, serial, integer, varchar } from 'drizzle-orm/pg-core';

export const instansi = pgTable('instansi', {
  id: serial('id').primaryKey(),
  kode_instansi: integer('kode_instansi').notNull(),
  nama_instansi: varchar('nama_instansi', { length: 255 }).notNull(),
  kat_instansi_id: integer('kat_instansi_id').notNull(),
});


