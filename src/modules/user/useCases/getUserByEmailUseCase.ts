import { eq } from "drizzle-orm"
import { db } from "src/db/config"
import { users } from "src/db/schemas/user"

export const getUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email))
}