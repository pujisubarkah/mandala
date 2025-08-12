import { db } from '@/server/database';
import { instansi } from '@/server/database/schema/instansi';
import { eq } from 'drizzle-orm';
import type { H3Event } from 'h3';
import { readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // Ambil semua data instansi
    const data = await db.select().from(instansi);
    return data;
  }

  if (method === 'POST') {
    const body = await readBody(event);
    // Validasi sederhana
    if (!body.kode_instansi || !body.nama_instansi || !body.kat_instansi_id) {
      return { error: 'Semua field wajib diisi' };
    }
    const [newInstansi] = await db.insert(instansi).values({
      kode_instansi: body.kode_instansi,
      nama_instansi: body.nama_instansi,
      kat_instansi_id: body.kat_instansi_id,
    }).returning();
    return newInstansi;
  }

  if (method === 'DELETE') {
    const body = await readBody(event);
    if (!body.id) return { error: 'ID wajib diisi' };
    await db.delete(instansi).where(eq(instansi.id, body.id));
    return { success: true };
  }

  return { error: 'Method tidak didukung' };
});
