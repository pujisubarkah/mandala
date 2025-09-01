
import { db } from '@/server/database'; // Ensure this db is created using drizzle-orm/mysql-core
import { pegawai } from '@/server/database/schema/pegawai'; // Pastikan schema ini menggunakan field lowercase jabfung_id
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { jabfung } from '@/server/database/schema/jabfung';
import { eq } from 'drizzle-orm';
import { readBody, sendError, createError } from 'h3';
// Make sure your db instance and schema are created using drizzle-orm/mysql-core

// If you are using drizzle-orm/mysql-core, ensure your db and schema are imported from drizzle-orm/mysql-core, not pg-core.

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      // Gunakan nama field konsisten: jabfung_id
      const result = await db
        .select({
          id: pegawai.id,
          nip: pegawai.nip,
          nama: pegawai.nama,
          jns_kelamin: jns_kelamin.jns_kelamin,
          golongan: golongan.golongan,
          jalur_pengangkatan: jalur.jalur_pengangkatan,
          nm_jenjang: jenjang.nm_jenjang,
          nama_instansi: instansi.nama_instansi,
          pendidikan: pendidikan.pendidikan,
          photo: pegawai.photo,
          jabfung: jabfung.fungsional,
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
  .leftJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id))
  .where(eq(pegawai.jabfung_id, 2));
      // Pastikan semua field yang bisa null di-handle
      const mapped = result.map(p => ({
        ...p,
        nm_jenjang: p.nm_jenjang || '-',
        nama_instansi: p.nama_instansi || '-',
        pendidikan: p.pendidikan || '-',
        jabfung: p.jabfung || '-',
        photo: p.nip ? `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${p.nip}.jpg` : null,
      }));
      return mapped;
    } catch (err) {
      // Log error detail ke console agar mudah debug
      // eslint-disable-next-line no-console
      console.error('DB Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data' }));
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      await db.insert(pegawai).values(body);
      return { success: true };
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menambah data' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
