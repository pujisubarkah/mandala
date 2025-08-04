

import { db } from '@/server/database'
import { pendidikan } from '@/server/database/schema/pendidikan';
import { readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  try {
    if (method === 'GET') {
      // Ambil semua data pendidikan
      const data = await db.select().from(pendidikan);
      return { success: true, data };
    }
    if (method === 'POST') {
      const body = await readBody(event);
      if (!body?.pendidikan) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Field pendidikan wajib diisi' }));
      }
      const inserted = await db.insert(pendidikan).values({ pendidikan: body.pendidikan }).returning();
      return { success: true, data: inserted[0] };
    }
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal server error', cause: err }));
  }
});
