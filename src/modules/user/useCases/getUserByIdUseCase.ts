import { eq } from "drizzle-orm"
import { db } from "src/db/config"
import { users } from "src/db/schemas/user"

export const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id))
}