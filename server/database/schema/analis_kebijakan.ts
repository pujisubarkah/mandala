import { pgTable, integer, varchar, text, date } from 'drizzle-orm/pg-core';

export const pegawai = pgTable('pegawai', {
  id: integer('id').primaryKey().notNull(),
  nip: varchar('nip', { length: 50 }).notNull(),
  niakn: varchar('niakn', { length: 50 }),
  nama: text('nama').notNull(),
  jns_kelamin_id: integer('jns_kelamin_id'),
  golongan_id: integer('golongan_id'),
  jalur_id: integer('jalur_id'),
  jenjang_id: integer('jenjang_id'),
  instansi_id: integer('instansi_id'),
  phone: text('phone'),
  email: text('email'),
  nomor_surat: text('nomor_surat'),
  tmt_pangkat: date('tmt_pangkat'),
  tmt_surat: date('tmt_surat'),
  unit_kerja: text('unit_kerja'),
  photo: text('photo'),
  Jabfung_id: integer('Jabfung_id'),
  pendidikan_id: integer('pendidikan_id'),
});