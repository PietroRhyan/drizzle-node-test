import { NewUser, User } from "db/schemas/user"

export interface UsersRepository {
  create(data: NewUser): Promise<void>
  getAll(): Promise<User[]>
  update(newData: NewUser, id: string): Promise<NewUser>
  delete(id: string): Promise<void>

  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findBySessionToken(sessionToken: string): Promise<User>
}