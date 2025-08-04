import { pgTable, serial, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  role_id: integer('role_id').notNull(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  nama: varchar('nama', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
