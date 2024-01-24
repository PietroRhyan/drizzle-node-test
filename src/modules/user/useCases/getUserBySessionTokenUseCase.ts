import { eq } from "drizzle-orm"
import { db } from "../../../db/config"
import { users } from "../../../db/schemas/user"

export const getUserBySessionToken = async (sessionToken: string) => {
  return await db.select().from(users).where(eq(users.sessionToken, sessionToken))
}