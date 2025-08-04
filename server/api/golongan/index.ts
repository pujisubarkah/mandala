import { db } from '@/server/database';
import { golongan } from '@/server/database/schema/golongan';
import { readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  try {
    if (method === 'GET') {
      const data = await db.select().from(golongan);
      return { success: true, data };
    }
    if (method === 'POST') {
      const body = await readBody(event);
      if (!body?.golongan) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Field golongan wajib diisi' }));
      }
      const inserted = await db.insert(golongan).values({ golongan: body.golongan }).returning();
      return { success: true, data: inserted[0] };
    }
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal server error', cause: err }));
  }
});
