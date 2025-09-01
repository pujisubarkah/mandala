import { db } from '../../database';
import { download_categories } from '../../database/schema/download_categories';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // GET: /api/download_categories
  if (event.req.method === 'GET') {
    const categories = await db.select().from(download_categories);
    return categories;
  }
  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method Not Allowed' };
});
