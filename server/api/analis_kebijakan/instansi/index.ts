import { db } from '@/server/database';
import { pegawai } from '@/server/database/schema/pegawai';
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { jabfung } from '@/server/database/schema/jabfung';
import { eq, and } from 'drizzle-orm';
import { readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = event.node.req.url ? new URL(event.node.req.url, 'http://localhost').searchParams : null;
  const instansi_id = query?.get('instansi_id');

  if (method === 'GET') {
    try {
      if (!instansi_id) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'instansi_id required' }));
      }
      const result = await db
        .select({
          id: pegawai.id,
          nip: pegawai.nip,
          niakn: pegawai.niakn,
          nama: pegawai.nama,
          jns_kelamin: jns_kelamin.jns_kelamin,
          golongan: golongan.golongan,
          jalur_pengangkatan: jalur.jalur_pengangkatan,
          nm_jenjang: jenjang.nm_jenjang,
          nama_instansi: instansi.nama_instansi,
          pendidikan: pendidikan.pendidikan,
          photo: pegawai.photo,
          jabfung: jabfung.fungsional,
          phone: pegawai.phone,
          email: pegawai.email,
          nomor_surat: pegawai.nomor_surat,
          tmt_pangkat: pegawai.tmt_pangkat,
          tmt_surat: pegawai.tmt_surat,
          unit_kerja: pegawai.unit_kerja,
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
        .leftJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id))
        .where(and(eq(pegawai.jabfung_id, 1), eq(pegawai.instansi_id, Number(instansi_id))));
      const mapped = result.map(p => ({
        ...p,
        nm_jenjang: p.nm_jenjang || '-',
        nama_instansi: p.nama_instansi || '-',
        pendidikan: p.pendidikan || '-',
        jabfung: p.jabfung || '-',
        photo: p.nip ? `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${p.nip}.jpg` : null,
        nomor_surat: p.nomor_surat || '-',
        tmt_pangkat: p.tmt_pangkat || '-',
        tmt_surat: p.tmt_surat || '-',
        unit_kerja: p.unit_kerja || '-',
        phone: p.phone || '-',
        email: p.email || '-',
      }));
      return mapped;
    } catch (err) {
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
