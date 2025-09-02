import { db } from '@/server/database'; // Ensure this db is created using drizzle-orm/mysql-core
import { pegawai } from '@/server/database/schema/pegawai'; // Pastikan schema ini menggunakan field lowercase jabfung_id
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { golongan } from '@/server/database/schema/golongan';
import { jalur } from '@/server/database/schema/jalur';
import { jenjang } from '@/server/database/schema/jenjang';
import { instansi } from '@/server/database/schema/instansi';
import { pendidikan } from '@/server/database/schema/pendidikan';
import { jabfung } from '@/server/database/schema/jabfung';
import { eq, and } from 'drizzle-orm';
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
        .where(and(eq(pegawai.jabfung_id, '3'), eq(pegawai.status, 'aktif')));
      // Pastikan semua field yang bisa null di-handle
      const mapped = result.map(p => ({
        ...p,
        nm_jenjang: p.nm_jenjang || '-',
        nama_instansi: p.nama_instansi || '-',
        pendidikan: p.pendidikan || '-',
        jabfung: p.jabfung || '-',
        photo: p.nip ? `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${p.nip}.jpg` : null,
        status: p.status || 'aktif',
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
      
      // Validate and structure data for analis bangkom
      const newAnalisBangkom = {
        nip: body.nip,
        niakn: body.niakn || null,
        nama: body.nama,
        jns_kelamin_id: body.jns_kelamin_id ? String(body.jns_kelamin_id) : null,
        golongan_id: body.golongan_id ? String(body.golongan_id) : null,
        jalur_id: body.jalur_id ? String(body.jalur_id) : null,
        jenjang_id: body.jenjang_id ? String(body.jenjang_id) : null,
        instansi_id: body.instansi_id ? String(body.instansi_id) : null,
        phone: body.phone || null,
        email: body.email || null,
        nomor_surat: body.nomor_surat || null,
        tmt_pangkat: body.tmt_pangkat || null,
        tmt_surat: body.tmt_surat || null,
        unit_kerja: body.unit_kerja || null,
        photo: body.photo || null,
        jabfung_id: '3', // Analis Bangkom jabfung_id as string
        pendidikan_id: body.pendidikan_id ? String(body.pendidikan_id) : null,
        status: body.status || 'aktif',
      };

      await db.insert(pegawai).values(newAnalisBangkom);
      return { success: true, message: 'Data analis bangkom berhasil ditambahkan' };
    } catch (err) {
      console.error('Insert Error:', err);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menambah data analis bangkom' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
