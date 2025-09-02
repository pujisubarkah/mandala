import { db } from '~/server/database';
import { pegawai } from '~/server/database/schema/pegawai';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    return { error: 'Method not allowed' };
  }

  const body = await readBody(event);
  const { id, photo } = body;

  if (!id || !photo) {
    return { error: 'Missing id or photo' };
  }

  // Update photo field for pegawai with given id
  await db.update(pegawai)
    .set({ photo })
    .where(eq(pegawai.id, id));

  return { success: true };
});
