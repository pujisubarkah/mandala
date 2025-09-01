import { db } from '@/server/database';
import { video } from '@/server/database/schema/video';
import { categories } from '@/server/database/schema/categories';
import { eq } from 'drizzle-orm';
import { readBody, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === 'GET') {
    // Get all videos or by id, include category
    if (query.id) {
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
        .where(eq(video.id, Number(query.id)));
      return result[0] || null;
    }
    return await db
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
      .leftJoin(categories, eq(video.category_id, categories.id));
  }

  if (method === 'POST') {
    const body = await readBody(event);
    // Validation minimal: title & video_url wajib
    if (!body.title || !body.video_url) {
      throw createError({ statusCode: 400, statusMessage: 'Title dan video_url wajib diisi' });
    }
    const newVideo = await db.insert(video).values({
      ...body,
      created_at: new Date(),
      updated_at: new Date()
    }).returning();
    return newVideo[0];
  }


  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
