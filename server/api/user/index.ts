import { defineEventHandler, readBody, getQuery, createError } from 'h3'
import { db } from '~/server/database'
import { users } from '~/server/database/schema/user'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    switch (method) {
      case 'GET':
        return await getUsers(event)
      case 'POST':
        return await createUser(event)
      case 'PUT':
        return await updateUser(event)
      case 'DELETE':
        return await deleteUser(event)
      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method Not Allowed'
        })
    }
  } catch (error) {
    console.error('User API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})

// GET - Ambil semua users atau user berdasarkan ID
async function getUsers(event: any) {
  const query = getQuery(event)
  const id = query.id

  if (id) {
    // Ambil user berdasarkan ID
    const user = await db.select().from(users).where(eq(users.id, Number(id)))
    if (user.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }
    return { data: user[0] }
  } else {
    // Ambil semua users
    const allUsers = await db.select().from(users)
    return { data: allUsers }
  }
}

// POST - Buat user baru
async function createUser(event: any) {
  const body = await readBody(event)
  
  // Validasi required fields
  if (!body.username || !body.nama || !body.email || !body.password || !body.role_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: username, nama, email, password, role_id'
    })
  }

  // Insert user baru
  const newUser = await db.insert(users).values({
    role_id: body.role_id,
    username: body.username,
    nama: body.nama,
    email: body.email,
    password: body.password // Note: Sebaiknya di-hash dulu
  }).returning()

  return { 
    message: 'User created successfully',
    data: newUser[0] 
  }
}

// PUT - Update user berdasarkan ID
async function updateUser(event: any) {
  const query = getQuery(event)
  const id = query.id
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Cek apakah user exists
  const existingUser = await db.select().from(users).where(eq(users.id, Number(id)))
  if (existingUser.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Update user
  const updatedUser = await db.update(users)
    .set({
      role_id: body.role_id,
      username: body.username,
      nama: body.nama,
      email: body.email,
      password: body.password
    })
    .where(eq(users.id, Number(id)))
    .returning()

  return { 
    message: 'User updated successfully',
    data: updatedUser[0] 
  }
}

// DELETE - Hapus user berdasarkan ID
async function deleteUser(event: any) {
  const query = getQuery(event)
  const id = query.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Cek apakah user exists
  const existingUser = await db.select().from(users).where(eq(users.id, Number(id)))
  if (existingUser.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Hapus user
  await db.delete(users).where(eq(users.id, Number(id)))

  return { message: 'User deleted successfully' }
}
