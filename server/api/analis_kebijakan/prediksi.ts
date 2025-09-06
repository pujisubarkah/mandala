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
  let queryBuilder = db
    .select()
    .from(pegawai)
    .innerJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
    .innerJoin(golongan, eq(pegawai.golongan_id, golongan.id))
    .innerJoin(jalur, eq(pegawai.jalur_id, jalur.id))
    .innerJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
    .innerJoin(instansi, eq(pegawai.instansi_id, instansi.id))
    .innerJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
    .innerJoin(jabfung, eq(pegawai.jabfung_id, jabfung.id));

  const result = instansi_id
    ? await queryBuilder.where(eq(pegawai.instansi_id, instansi_id)).execute()
    : await queryBuilder.execute();

  const mapped = result.map(p => {
    let prediksi_kenaikan = null;
    let tahun_kenaikan = null;
    // Ambil data dari hasil join
    const peg = p.pegawai;
    const gol = p.golongan;
    const jenj = p.jenjang;
    const pend = p.pendidikan;
    const inst = p.instansi;
    const jab = p.jabfung;
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
    return {
      id: peg.id,
      nip: peg.nip,
      niakn: peg.niakn,
      nama: peg.nama,
      jns_kelamin: p.jns_kelamin.jns_kelamin,
      golongan: gol.golongan,
      jalur_pengangkatan: p.jalur.jalur_pengangkatan,
      nm_jenjang: jenj.nm_jenjang,
      nama_instansi: inst.nama_instansi,
      pendidikan: pend.pendidikan,
      photo: peg.nip ? `https://dtjrketxxozstcwvotzh.supabase.co/storage/v1/object/public/foto_pegawai/${peg.nip}.jpg` : null,
      jabfung: jab.fungsional,
      phone: peg.phone,
      email: peg.email,
      nomor_surat: peg.nomor_surat,
      tmt_pangkat: peg.tmt_pangkat,
      tmt_surat: peg.tmt_surat,
      unit_kerja: peg.unit_kerja,
      status: peg.status,
      prediksi_kenaikan: prediksi_kenaikan || '-',
      tahun_kenaikan: tahun_kenaikan || '-',
    };
  });
  const tahunPrediksi = [2026, 2027, 2028, 2029, 2030];
  const rekap = {
    Muda: {} as Record<number, number>,
    Madya: {} as Record<number, number>,
    Utama: {} as Record<number, number>
  };
  tahunPrediksi.forEach(tahun => {
    rekap.Muda[tahun] = mapped.filter(p => p.prediksi_kenaikan === 'Muda' && Number(p.tahun_kenaikan) === tahun).length;
    rekap.Madya[tahun] = mapped.filter(p => p.prediksi_kenaikan === 'Madya' && Number(p.tahun_kenaikan) === tahun).length;
    rekap.Utama[tahun] = mapped.filter(p => p.prediksi_kenaikan === 'Utama' && Number(p.tahun_kenaikan) === tahun).length;
  });

  return rekap;
});