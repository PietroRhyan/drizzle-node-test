import { eq } from "drizzle-orm"
import { db } from "../../../db/config"
import { users } from "../../../db/schemas/user"

export const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id))
}