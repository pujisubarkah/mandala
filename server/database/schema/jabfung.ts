import { pgTable, integer, text } from 'drizzle-orm/pg-core'

export const jabfung = pgTable('jabfung', {
  id: integer('id').primaryKey(),
  fungsional: text('fungsional'),
})
