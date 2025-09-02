import { db } from '@/server/database'
import { pegawai } from '@/server/database/schema/analis_kebijakan'
import { jns_kelamin } from '@/server/database/schema/jns_kelamin'
import { golongan } from '@/server/database/schema/golongan'
import { jalur } from '@/server/database/schema/jalur'
import { jenjang } from '@/server/database/schema/jenjang'
import { instansi } from '@/server/database/schema/instansi'
import { jabfung } from '@/server/database/schema/jabfung'
import { pendidikan } from '@/server/database/schema/pendidikan'
import { eq, count } from 'drizzle-orm'
import { sendError, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'GET') {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }))
  }
  try {
    // Per jenis kelamin
    const kelamin = await db
      .select({ name: jns_kelamin.jns_kelamin, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(jns_kelamin, eq(pegawai.jns_kelamin_id, jns_kelamin.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(jns_kelamin.jns_kelamin)

    // Per golongan
    const golonganData = await db
      .select({ name: golongan.golongan, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(golongan, eq(pegawai.golongan_id, golongan.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(golongan.golongan)

    // Per jalur pengangkatan
    const jalurData = await db
      .select({ name: jalur.jalur_pengangkatan, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(jalur, eq(pegawai.jalur_id, jalur.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(jalur.jalur_pengangkatan)

    // Per jenjang
    const jenjangData = await db
      .select({ name: jenjang.nm_jenjang, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(jenjang.nm_jenjang)

    // Per instansi
    const instansiData = await db
      .select({ name: instansi.nama_instansi, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(instansi, eq(pegawai.instansi_id, instansi.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(instansi.nama_instansi)

    // Per pendidikan
    const pendidikanData = await db
      .select({ name: pendidikan.pendidikan, value: count(pegawai.id) })
      .from(pegawai)
      .leftJoin(pendidikan, eq(pegawai.pendidikan_id, pendidikan.id))
  .where(eq(pegawai.jabfung_id, 1))
      .groupBy(pendidikan.pendidikan)

    // Per rentang usia (berdasarkan 4 digit pertama NIP)
    const allPegawai = await db
      .select({ nip: pegawai.nip })
      .from(pegawai)
      .where(eq(pegawai.jabfung_id, 1))

    // Hitung distribusi usia berdasarkan NIP
    const currentYear = new Date().getFullYear()
    const usiaDistribusi: { [key: string]: number } = {}
    
    allPegawai.forEach(p => {
      if (p.nip && p.nip.length >= 4) {
        const tahunLahir = parseInt(p.nip.substring(0, 4))
        if (!isNaN(tahunLahir) && tahunLahir > 1900 && tahunLahir <= currentYear) {
          const usia = currentYear - tahunLahir
          
          // Kategorikan usia ke rentang
          let kategoriUsia
          if (usia < 25) kategoriUsia = '<25 tahun'
          else if (usia < 30) kategoriUsia = '25-29 tahun'
          else if (usia < 35) kategoriUsia = '30-34 tahun'
          else if (usia < 40) kategoriUsia = '35-39 tahun'
          else if (usia < 45) kategoriUsia = '40-44 tahun'
          else if (usia < 50) kategoriUsia = '45-49 tahun'
          else if (usia < 55) kategoriUsia = '50-54 tahun'
          else if (usia < 60) kategoriUsia = '55-59 tahun'
          else kategoriUsia = '≥60 tahun'
          
          usiaDistribusi[kategoriUsia] = (usiaDistribusi[kategoriUsia] || 0) + 1
        }
      }
    })

    return {
      jns_kelamin: Object.fromEntries(kelamin.map(k => [k.name || '-', Number(k.value)])),
      golongan: Object.fromEntries(golonganData.map(g => [g.name || '-', Number(g.value)])),
      jalur_pengangkatan: Object.fromEntries(jalurData.map(j => [j.name || '-', Number(j.value)])),
      nm_jenjang: Object.fromEntries(jenjangData.map(j => [j.name || '-', Number(j.value)])),
      nama_instansi: Object.fromEntries(instansiData.map(i => [i.name || '-', Number(i.value)])),
      pendidikan: Object.fromEntries(pendidikanData.map(p => [p.name || '-', Number(p.value)])),
      rentang_usia: usiaDistribusi,
    }
  } catch (err) {
    console.log('SUMMARY ERROR:', err)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data summary' }))
  }
})