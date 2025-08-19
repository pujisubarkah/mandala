import { db } from '@/server/database';
import { pegawai } from '@/server/database/schema/analis_kebijakan';
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { eq } from 'drizzle-orm';
import { readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = event.context.params?.id;

  if (!id) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'ID tidak ditemukan' }));
  }

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
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
        .where(eq(pegawai.id, Number(id)));

      if (!result.length) {
        return sendError(event, createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' }));
      }
      const p = result[0];
      return {
        ...p,
        photo: `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${p.nip}.jpg`
      };
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data' }));
    }
  }

  if (method === 'PUT' || method === 'PATCH') {
    try {
      const body = await readBody(event);
      await db.update(pegawai).set(body).where(eq(pegawai.id, Number(id)));
      return { success: true };
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengupdate data' }));
    }
  }

  if (method === 'DELETE') {
    try {
      await db.delete(pegawai).where(eq(pegawai.id, Number(id)));
      return { success: true };
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menghapus data' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
