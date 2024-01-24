import { db } from "../../../db/config"
import { users } from "../../../db/schemas/user"

export const getAllUsers = async () => {
  return await db.select().from(users)
}