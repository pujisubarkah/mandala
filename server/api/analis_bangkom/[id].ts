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
          photo: pegawai.photo,
          jabfung: jabfung.fungsional,
          phone: pegawai.phone,
          email: pegawai.email,
          nomor_surat: pegawai.nomor_surat,
          tmt_pangkat: pegawai.tmt_pangkat,
          tmt_surat: pegawai.tmt_surat,
          unit_kerja: pegawai.unit_kerja,
          status: pegawai.status,
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
        .leftJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id))
        .where(and(eq(pegawai.id, Number(id)), eq(pegawai.jabfung_id, '3'), eq(pegawai.status, 'aktif')));

      if (!result.length) {
        return sendError(event, createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' }));
      }
      const p = result[0];
      return {
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
        status: p.status || 'aktif',
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('DB Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data' }));
    }
  }

  if (method === 'PUT' || method === 'PATCH') {
    try {
      const body = await readBody(event);
      
      // Convert numeric IDs to strings for foreign keys
      const updateData = {
        ...body,
        jns_kelamin_id: body.jns_kelamin_id ? String(body.jns_kelamin_id) : body.jns_kelamin_id,
        golongan_id: body.golongan_id ? String(body.golongan_id) : body.golongan_id,
        jalur_id: body.jalur_id ? String(body.jalur_id) : body.jalur_id,
        jenjang_id: body.jenjang_id ? String(body.jenjang_id) : body.jenjang_id,
        instansi_id: body.instansi_id ? String(body.instansi_id) : body.instansi_id,
        pendidikan_id: body.pendidikan_id ? String(body.pendidikan_id) : body.pendidikan_id,
        jabfung_id: '3', // Ensure it remains Analis Bangkom
        status: body.status || 'aktif'
      };
      
      await db.update(pegawai).set(updateData).where(eq(pegawai.id, Number(id)));
      return { success: true };
    } catch (err) {
      console.error('Update Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengupdate data' }));
    }
  }

  if (method === 'DELETE') {
    try {
      // Soft delete by updating status instead of actual deletion
      await db.update(pegawai).set({ status: 'non_aktif' }).where(eq(pegawai.id, Number(id)));
      return { success: true };
    } catch (err) {
      console.error('Delete Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menghapus data' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
