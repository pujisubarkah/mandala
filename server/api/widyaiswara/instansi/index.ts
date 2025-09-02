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
        .where(and(
          eq(pegawai.jabfung_id, '2'), 
          eq(pegawai.instansi_id, instansi_id),
          eq(pegawai.status, 'aktif') // Only get active widyaiswara
        ));
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
        status: p.status || 'aktif',
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
      
      // Validate required fields for widyaiswara
      const newWidyaiswara = {
        id: body.id ?? undefined, // Add this line; or use null if your schema allows
        nip: body.nip,
        niakn: body.niakn || null,
        nama: body.nama,
        jns_kelamin_id: body.jns_kelamin_id || null,
        golongan_id: body.golongan_id || null,
        jalur_id: body.jalur_id || null,
        jenjang_id: body.jenjang_id || null,
        instansi_id: body.instansi_id,
        phone: body.phone || null,
        email: body.email || null,
        nomor_surat: body.nomor_surat || null,
        tmt_pangkat: body.tmt_pangkat || null,
        tmt_surat: body.tmt_surat || null,
        unit_kerja: body.unit_kerja || null,
        photo: body.photo || null,
        jabfung_id: '2', // Widyaiswara jabfung_id
        pendidikan_id: body.pendidikan_id || null,
        status: body.status || 'aktif',
      };

      await db.insert(pegawai).values(newWidyaiswara);
      return { success: true, message: 'Data widyaiswara berhasil ditambahkan' };
    } catch (err) {
      console.error('Insert Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menambah data widyaiswara' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
