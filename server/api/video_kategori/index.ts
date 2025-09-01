import { db } from '@/server/database';
import { categories } from '@/server/database/schema/categories';
import { eq } from 'drizzle-orm';
import { readBody, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === 'GET') {
    // Get all categories or by id
    if (query.id) {
      const result = await db
        .select()
        .from(categories)
        .where(eq(categories.id, Number(query.id)));
      return result[0] || null;
    }
    return await db.select().from(categories);
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
