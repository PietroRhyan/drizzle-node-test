import { pgTable, text, uuid as uuidv4, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable("users", {
  id: uuidv4('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email'),
  phone: varchar('phone', { length: 256 })
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert