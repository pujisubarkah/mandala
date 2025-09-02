import { defineEventHandler, readBody, getQuery, createError } from 'h3'
import { db } from '~/server/database'
import { users } from '~/server/database/schema/user'
import { instansi } from '~/server/database/schema/instansi'
import { roles } from '~/server/database/schema/role'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const method = event.req.method
  const rawId = event.context.params?.id || getQuery(event).id
  const id = typeof rawId === 'string' ? rawId : String(rawId)

  try {
    switch (method) {
      case 'GET':
        if (!id) throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
        return await getUserById(id)
      case 'PUT':
        if (!id) throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
        return await updateUser(id, event)
      case 'DELETE':
        if (!id) throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
        return await deleteUser(id)
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        })
    }
  } catch (error) {
    console.error('User [id] API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})

async function getUserById(id: string) {
  const user = await db
    .select({
      id: users.id,
      username: users.username,
      nama: users.nama,
      email: users.email,
      role_id: users.role_id,
      role_nama: roles.role_nama,
      instansi_id: users.instansi_id,
      nama_instansi: instansi.nama_instansi,
      createdAt: users.createdAt
    })
    .from(users)
    .leftJoin(instansi, eq(users.instansi_id, instansi.id))
    .leftJoin(roles, eq(users.role_id, roles.role_id))
    .where(eq(users.id, Number(id)));
  if (user.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  return { data: user[0] }
}

async function updateUser(id: string, event: any) {
  const body = await readBody(event)
  // Hash password jika diisi
  const updateData: Record<string, any> = {
    role_id: body.role_id,
    username: body.username,
    nama: body.nama,
    email: body.email,
    instansi_id: body.instansi_id
  }
  if (body.password) {
    updateData.password = bcrypt.hashSync(body.password, 10)
  }
  await db.update(users)
    .set(updateData)
    .where(eq(users.id, Number(id)));
  // Return updated user with join
  const user = await db
    .select({
      id: users.id,
      username: users.username,
      nama: users.nama,
      email: users.email,
      role_id: users.role_id,
      role_nama: roles.role_nama,
      instansi_id: users.instansi_id,
      nama_instansi: instansi.nama_instansi,
      createdAt: users.createdAt
    })
    .from(users)
    .leftJoin(instansi, eq(users.instansi_id, instansi.id))
    .leftJoin(roles, eq(users.role_id, roles.role_id))
    .where(eq(users.id, Number(id)));
  return { message: 'User updated successfully', data: user[0] }
}

async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, Number(id)))
  return { message: 'User deleted successfully' }
}
