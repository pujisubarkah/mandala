import { db } from '../../database';
import { roles } from '../../database/schema/role';

export default defineEventHandler(async (event) => {
  // GET: /api/role
  if (event.req.method === 'GET') {
    const data = await db.select().from(roles);
    return data;
  }
  event.res.statusCode = 405;
  return { error: 'Method Not Allowed' };
});
