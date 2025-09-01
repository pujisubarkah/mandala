import { db } from '@/server/database';
import { downloads } from '@/server/database/schema/downloads';
import { eq } from 'drizzle-orm';
import { readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID wajib disertakan' });
  }

  if (method === 'GET') {
    // Get download by id
    const result = await db
      .select()
      .from(downloads)
      .where(eq(downloads.id, Number(id)));
    return result[0] || null;
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    if (!body.title || !body.download_url) {
      throw createError({ statusCode: 400, statusMessage: 'Title dan download_url wajib diisi' });
    }
    const { id: _id, ...updateData } = body;
    const updated = await db.update(downloads)
      .set({
        ...updateData,
        updated_at: new Date()
      })
      .where(eq(downloads.id, Number(id)))
      .returning();
    return updated[0] || null;
  }

  if (method === 'DELETE') {
    const deleted = await db.delete(downloads)
      .where(eq(downloads.id, Number(id)))
      .returning();
    return deleted[0] || null;
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
