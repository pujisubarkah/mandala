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
import { sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const query = event.node.req.url ? new URL(event.node.req.url, 'http://localhost').searchParams : null;
  const tahun = query?.get('tahun');
  const jenjangTarget = query?.get('jenjang');

  if (!tahun || !jenjangTarget) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'tahun dan jenjang required' }));
  }

  // Query semua pegawai dan join
  const result = await db
    .select()
    .from(pegawai)
    .innerJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
    .innerJoin(golongan, eq(pegawai.golongan_id, golongan.id))
    .innerJoin(jalur, eq(pegawai.jalur_id, jalur.id))
    .innerJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
    .innerJoin(instansi, eq(pegawai.instansi_id, instansi.id))
    .innerJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
    .innerJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id))
    .execute();

  // Prediksi logic sama seperti summary
  const filtered = result.filter(p => {
    const peg = p.pegawai;
    const gol = p.golongan;
    const jenj = p.jenjang;
    const pend = p.pendidikan;
    let prediksi_kenaikan = null;
    let tahun_kenaikan = null;
    if (peg.tmt_pangkat) {
      const tmt = new Date(peg.tmt_pangkat);
      const tahunNaik = tmt.getFullYear() + 4;
      tahun_kenaikan = tahunNaik;
      if (jenj.nm_jenjang === 'Pertama' && gol.golongan === 'III/b') {
        prediksi_kenaikan = 'Muda';
      } else if (jenj.nm_jenjang === 'Muda' && gol.golongan === 'III/d') {
        prediksi_kenaikan = 'Madya';
      } else if (jenj.nm_jenjang === 'Madya' && gol.golongan === 'IV/a' && pend.pendidikan === 'S3') {
        prediksi_kenaikan = 'Utama';
      }
    }
    return prediksi_kenaikan === jenjangTarget && Number(tahun_kenaikan) === Number(tahun);
  });

  // Return nama dan info pegawai yang lolos filter
  return filtered.map(p => {
    const peg = p.pegawai;
    const gol = p.golongan;
    const jenj = p.jenjang;
    const inst = p.instansi;
    return {
      id: peg.id,
      nama: peg.nama,
      nip: peg.nip,
      jenjang: jenj.nm_jenjang,
      golongan: gol.golongan,
      instansi: inst.nama_instansi,
      tmt_pangkat: peg.tmt_pangkat,
      pendidikan: p.pendidikan.pendidikan,
    };
  });
});
