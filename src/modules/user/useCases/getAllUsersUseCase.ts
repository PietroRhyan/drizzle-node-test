import { db } from "src/db/config"
import { users } from "src/db/schemas/user"

export const getAllUsers = async () => {
  return await db.select().from(users)
}