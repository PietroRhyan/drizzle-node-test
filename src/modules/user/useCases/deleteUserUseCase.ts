import { eq } from "drizzle-orm"
import { db } from "src/db/config"
import { users } from "src/db/schemas/user"

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(eq(users.id, id)).returning({ userId: users.id, userName: users.name })
}