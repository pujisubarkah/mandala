import { pgTable, serial, text, date, pgEnum } from 'drizzle-orm/pg-core'

// Define status enum
export const statusEnum = pgEnum('status', ['aktif', 'non_aktif', 'pensiun', 'mutasi'])

export const pegawai = pgTable('pegawai', {
  id: serial('id').primaryKey(),
  nip: text('nip'),
  niakn: text('niakn'),
  nama: text('nama'),
  jns_kelamin_id: text('jns_kelamin_id'),
  golongan_id: text('golongan_id'),
  jalur_id: text('jalur_id'),
  jenjang_id: text('jenjang_id'),
  instansi_id: text('instansi_id'),
  phone: text('phone'),
  email: text('email'),
  nomor_surat: text('nomor_surat'),
  tmt_pangkat: date('tmt_pangkat'),
  tmt_surat: date('tmt_surat'),
  unit_kerja: text('unit_kerja'),
  photo: text('photo'),
  jabfung_id: text('jabfung_id'),
  pendidikan_id: text('pendidikan_id'),
  status: statusEnum('status').default('aktif'),
})
