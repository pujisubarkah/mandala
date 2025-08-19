import { db } from '@/server/database';
import { jns_kelamin } from '@/server/database/schema/jns_kelamin';
import { readBody, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      const data = await db.select().from(jns_kelamin);
      return data;
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal mengambil data' }));
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      await db.insert(jns_kelamin).values(body);
      return { success: true };
    } catch (err) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Gagal menambah data' }));
    }
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
