import { db } from '@/server/database';
import { pegawai } from '@/server/database/schema/pegawai';
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { jabfung } from '@/server/database/schema/jabfung';
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
          status: pegawai.status,
          // Include IDs for editing
          jns_kelamin_id: pegawai.jns_kelamin_id,
          golongan_id: pegawai.golongan_id,
          jalur_id: pegawai.jalur_id,
          jenjang_id: pegawai.jenjang_id,
          instansi_id: pegawai.instansi_id,
          pendidikan_id: pegawai.pendidikan_id,
          jabfung_id: pegawai.jabfung_id,
        })
        .from(pegawai)
        .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
        .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
        .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
        .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
        .leftJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id))
        .where(eq(pegawai.id, Number(id)));

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
      
      // Validate and prepare update data
      const updateData = {
        ...(body.nip && { nip: body.nip }),
        ...(body.niakn && { niakn: body.niakn }),
        ...(body.nama && { nama: body.nama }),
        ...(body.jns_kelamin_id && { jns_kelamin_id: String(body.jns_kelamin_id) }),
        ...(body.golongan_id && { golongan_id: String(body.golongan_id) }),
        ...(body.jalur_id && { jalur_id: String(body.jalur_id) }),
        ...(body.jenjang_id && { jenjang_id: String(body.jenjang_id) }),
        ...(body.instansi_id && { instansi_id: String(body.instansi_id) }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.nomor_surat !== undefined && { nomor_surat: body.nomor_surat }),
        ...(body.tmt_pangkat && { tmt_pangkat: body.tmt_pangkat }),
        ...(body.tmt_surat && { tmt_surat: body.tmt_surat }),
        ...(body.unit_kerja !== undefined && { unit_kerja: body.unit_kerja }),
        ...(body.photo !== undefined && { photo: body.photo }),
        ...(body.pendidikan_id && { pendidikan_id: String(body.pendidikan_id) }),
        ...(body.status && { status: body.status }),
      };

      await db.update(pegawai).set(updateData).where(eq(pegawai.id, Number(id)));
      return { success: true, message: 'Data widyaiswara berhasil diperbarui' };
    } catch (err) {
      console.error('Update Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengupdate data widyaiswara' }));
    }
  }

  if (method === 'DELETE') {
    try {
      // Soft delete by updating status instead of hard delete
      await db.update(pegawai)
        .set({ status: 'non_aktif' })
        .where(eq(pegawai.id, Number(id)));
      return { success: true, message: 'Data widyaiswara berhasil dinonaktifkan' };
    } catch (err) {
      console.error('Delete Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menghapus data widyaiswara' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
