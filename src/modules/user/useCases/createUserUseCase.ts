import { db } from "src/db/config";
import { NewUser, users } from "src/db/schemas/user";

export const createUser = async (newUser: NewUser) => {
  return await db.insert(users).values(newUser).returning();
}