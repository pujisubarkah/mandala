import { db } from '@/server/database';
import { pegawai } from '@/server/database/schema/analis_kebijakan';
import { jenjang } from '@/server/database/schema/jenjang';
import { eq, count } from 'drizzle-orm';
import { sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      // Summary total pegawai per jenjang
      const result = await db
        .select({
          nm_jenjang: jenjang.nm_jenjang,
          total: count(pegawai.id),
        })
        .from(pegawai)
        .leftJoin(jenjang, eq(pegawai.jenjang_id, jenjang.id))
        .groupBy(jenjang.nm_jenjang);
      // Pastikan nm_jenjang selalu ada, jika null ganti dengan '-'
      return result.map(r => ({
        nm_jenjang: r.nm_jenjang || '-',
        total: Number(r.total),
      }));
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data summary jenjang' }));
    }
  }
});