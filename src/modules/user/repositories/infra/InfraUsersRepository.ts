import { NewUser, User, users } from "../../../../db/schemas/user";
import { UsersRepository } from "../UsersRepository";
import { db } from "../../../../db/config";
import { eq } from "drizzle-orm";

export class InfraUsersRepository implements UsersRepository {
  async create(data: NewUser) {
    await db.insert(users).values(data);
  }

  async getAll(): Promise<User[]> {
    return await db.select().from(users)
  }

  async update(data: NewUser, id: string): Promise<void> {
    await db.update(users).set(data).where(eq(users.id, id))
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id))
  }

  async findByEmail(email: string): Promise<User> {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0]
  }

  async findById(id: string): Promise<User> {
    const result = await db.select().from(users).where(eq(users.id, id))
    return result[0]
  }

  async findBySessionToken(sessionToken: string): Promise<User> {
    const result = await db.select().from(users).where(eq(users.sessionToken, sessionToken))
    return result[0]
  }
}