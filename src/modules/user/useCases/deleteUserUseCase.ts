import { eq } from "drizzle-orm"
import { db } from "../../../db/config"
import { users } from "../../../db/schemas/user"

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(eq(users.id, id)).returning({ userId: users.id, userName: users.name })
}