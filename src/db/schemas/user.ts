import { pgTable, text, uuid as uuidv4, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable("users", {
  id: uuidv4('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  sessionToken: varchar('session_token', { length: 255 }),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert