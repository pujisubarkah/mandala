import { db } from '@/server/database';
import { downloads } from '@/server/database/schema/downloads';
import { download_categories } from '@/server/database/schema/download_categories';
import { download_tags } from '@/server/database/schema/download_tags';
import { eq } from 'drizzle-orm';
import { readBody, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  if (method === 'GET') {
    // Get all downloads with join category and tags
    const result = await db
      .select({
        id: downloads.id,
        title: downloads.title,
        description: downloads.description,
        file_name: downloads.file_name,
        file_size: downloads.file_size,
        file_count: downloads.file_count,
        create_date: downloads.create_date,
        last_modified: downloads.last_modified,
        download_url: downloads.download_url,
        category_id: downloads.category_id,
        bg_color: downloads.bg_color,
        created_at: downloads.created_at,
        updated_at: downloads.updated_at,
        category: {
          id: download_categories.id,
          name: download_categories.name,
          description: download_categories.description,
          color: download_categories.color,
          bg_color: download_categories.bg_color
        }
      })
      .from(downloads)
      .leftJoin(download_categories, eq(downloads.category_id, download_categories.id));

    // Ambil tags untuk setiap download
    const downloadsWithTags = await Promise.all(result.map(async (item) => {
      const tags = await db.select().from(download_tags).where(eq(download_tags.download_id, item.id));
      return { ...item, tags };
    }));
    return downloadsWithTags;
  }

  if (method === 'POST') {
    const body = await readBody(event);
    if (!body.title || !body.download_url) {
      throw createError({ statusCode: 400, statusMessage: 'Title dan download_url wajib diisi' });
    }
    const newDownload = await db.insert(downloads).values({
      ...body,
      created_at: new Date(),
      updated_at: new Date()
    }).returning();
    return newDownload[0];
  }

  throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
});
