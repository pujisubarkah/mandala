import { db } from '@/server/database'
import { pegawai } from '@/server/database/schema/pegawai'
import { jenjang } from '@/server/database/schema/jenjang'
import { golongan } from '@/server/database/schema/golongan'
import { jalur } from '@/server/database/schema/jalur'
import { pendidikan } from '@/server/database/schema/pendidikan'
import { jns_kelamin } from '@/server/database/schema/jns_kelamin'
import { eq } from 'drizzle-orm'
import { readBody, sendError, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }))
  }

  try {
    const { data, instansi_id } = await readBody(event)

    if (!data || !Array.isArray(data) || data.length === 0) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Data tidak valid' }))
    }

    if (!instansi_id) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'instansi_id diperlukan' }))
    }

    // Get reference data for mapping
    const [jenjangData, golonganData, jalurData, pendidikanData, kelaminData] = await Promise.all([
      db.select().from(jenjang),
      db.select().from(golongan),
      db.select().from(jalur),
      db.select().from(pendidikan),
      db.select().from(jns_kelamin)
    ])

    // Helper function to find ID by name
    const findIdByName = (arr: any[], name: string, field: string) => {
      const found = arr.find(item => 
        item[field]?.toLowerCase().includes(name.toLowerCase()) || 
        name.toLowerCase().includes(item[field]?.toLowerCase())
      )
      return found?.id?.toString() || '1' // Default to first item if not found
    }

    // Process and validate data
    const processedData = data.map((row: any) => {
      // Map jenjang
      let jenjang_id = '1' // Default to Pertama
      if (row.jenjang) {
        const jenjangMap: { [key: string]: string } = {
          'pertama': '1',
          'muda': '2', 
          'madya': '3',
          'utama': '4'
        }
        jenjang_id = jenjangMap[row.jenjang.toLowerCase()] || '1'
      }

      // Map golongan
      const golongan_id = row.golongan ? 
        findIdByName(golonganData, row.golongan, 'golongan') : '1'

      // Map jalur pengangkatan
      const jalur_id = row.jalur_pengangkatan ? 
        findIdByName(jalurData, row.jalur_pengangkatan, 'jalur_pengangkatan') : '1'

      // Map pendidikan
      const pendidikan_id = row.pendidikan ? 
        findIdByName(pendidikanData, row.pendidikan, 'pendidikan') : '1'

      // Map jenis kelamin (auto detect from nama or default)
      let jns_kelamin_id = '1' // Default
      if (row.jns_kelamin) {
        const kelaminMap: { [key: string]: string } = {
          'laki': '1',
          'pria': '1',
          'male': '1',
          'perempuan': '2',
          'wanita': '2',
          'female': '2'
        }
        jns_kelamin_id = kelaminMap[row.jns_kelamin.toLowerCase()] || '1'
      }

      return {
        nip: typeof row.nip === 'string' ? row.nip : (row.nip !== undefined && row.nip !== null ? String(row.nip) : ''),
        niakn: row.niakn || '',
        nama: row.nama || '',
        jns_kelamin_id,
        golongan_id,
        jalur_id,
        jenjang_id,
        instansi_id: instansi_id.toString(),
        phone: row.phone || '',
        email: row.email || '',
        nomor_surat: row.nomor_surat || '',
        tmt_pangkat: row.tmt_pangkat || null,
        tmt_surat: row.tmt_surat || null,
        unit_kerja: row.unit_kerja || '',
        photo: null,
        jabfung_id: '1', // Analis Kebijakan
        pendidikan_id,
        status: (row.status as 'aktif' | 'non_aktif' | 'pensiun' | 'mutasi') || 'aktif'
      }
    })

    // Insert data in batches
    const batchSize = 50
    let insertedCount = 0
    
    for (let i = 0; i < processedData.length; i += batchSize) {
      const batch = processedData.slice(i, i + batchSize)
      
      try {
        await db.insert(pegawai).values(batch)
        insertedCount += batch.length
      } catch (batchError) {
        console.error('Batch insert error:', batchError)
        // Continue with next batch on error
      }
    }

    return {
      success: true,
      total: data.length,
      inserted: insertedCount,
      message: `Berhasil menginsert ${insertedCount} dari ${data.length} data`
    }

  } catch (error) {
    console.error('Bulk upload error:', error)
    return sendError(event, createError({ 
      statusCode: 500, 
      statusMessage: 'Gagal mengupload data: ' + (error as Error).message 
    }))
  }
})
