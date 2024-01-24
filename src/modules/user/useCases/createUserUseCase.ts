import { db } from "../../../db/config";
import { NewUser, users } from "../../../db/schemas/user";

export const createUser = async (newUser: NewUser) => {
  return await db.insert(users).values(newUser).returning();
}