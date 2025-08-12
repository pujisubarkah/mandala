import { db } from '@/server/database';
import { users } from '@/server/database/schema/user';
import { eq } from 'drizzle-orm';
import type { H3Event } from 'h3';
import { readBody } from 'h3';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi' };
  }

  // Cari user berdasarkan username
  const userList = await db.select().from(users).where(eq(users.username, username));
  const user = userList[0];

  if (!user) {
    return { error: 'Username tidak ditemukan' };
  }

  // Cek password (diasumsikan sudah di-hash di database)
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { error: 'Password salah' };
  }

  // Jangan kirim password ke client
  const { password: _pw, ...userData } = user;
  return userData;
});
