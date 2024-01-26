import { NewUser, User } from "db/schemas/user"

export interface UsersRepository {
  create(data: NewUser): Promise<void>
  getAll(): Promise<User[]>
  update(data: NewUser, id: string): Promise<void>
  delete(id: string): Promise<void>

  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findBySessionToken(sessionToken: string): Promise<User>
}