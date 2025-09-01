import { db } from '@/server/database';
import { video } from '@/server/database/schema/video';
import { categories } from '@/server/database/schema/categories';
import { eq } from 'drizzle-orm';
import { readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID wajib disertakan' });
  }

  if (method === 'GET') {
    // Ambil detail video by id, join kategori
    const result = await db
      .select({
        id: video.id,
        title: video.title,
        subtitle: video.subtitle,
        description: video.description,
        video_url: video.video_url,
        date_year: video.date_year,
        category_id: video.category_id,
        color: video.color,
        bg_color: video.bg_color,
        icon: video.icon,
        created_at: video.created_at,
        updated_at: video.updated_at,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          color: categories.color,
          bg_color: categories.bg_color
        }
      })
      .from(video)
      .leftJoin(categories, eq(video.category_id, categories.id))
      .where(eq(video.id, Number(id)));
    return result[0] || null;
  }

  if (method === 'PUT') {
    // Update video by id
    const body = await readBody(event);
    if (!body.title || !body.video_url) {
      throw createError({ statusCode: 400, statusMessage: 'Title dan video_url wajib diisi' });
    }
    // Jangan update id
    const { id: _id, ...updateData } = body;
    const updated = await db.update(video)
      .set({
        ...updateData,
        updated_at: new Date()
      })
      .where(eq(video.id, Number(id)))
      .returning();
    return updated[0] || null;
  }

  if (method === 'DELETE') {
    // Hapus video by id
    const deleted = await db.delete(video)
      .where(eq(video.id, Number(id)))
      .returning();
    return deleted[0] || null;
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
