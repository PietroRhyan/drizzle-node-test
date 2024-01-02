import { eq } from "drizzle-orm";
import { db } from "src/db/config";
import { NewUser, users } from "src/db/schemas/user";

export const updateUser = async (newUser: NewUser, id: string) => {
  return await db.update(users).set(newUser).where(eq(users.id, id)).returning()
}