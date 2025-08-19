import { db } from '@/server/database'; // Ensure this db is created using drizzle-orm/mysql-core
import { pegawai } from '@/server/database/schema/analis_kebijakan'; // Ensure this schema uses drizzle-orm/mysql-core
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { eq } from 'drizzle-orm';
import { readBody, sendError, createError } from 'h3';
// Make sure your db instance and schema are created using drizzle-orm/mysql-core

// If you are using drizzle-orm/mysql-core, ensure your db and schema are imported from drizzle-orm/mysql-core, not pg-core.

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
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
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id));
      // Pastikan nm_jenjang selalu ada, jika null ganti dengan '-'
      const mapped = result.map(p => ({
        ...p,
        nm_jenjang: p.nm_jenjang || '-',
        photo: p.nip ? `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${p.nip}.jpg` : null,
      }));
      return mapped;
    } catch (err) {
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
