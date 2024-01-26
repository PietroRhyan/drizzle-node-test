import { NewUser, User } from "db/schemas/user";
import { UsersRepository } from "../UsersRepository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []
  
  async create({ name, email, password }: NewUser): Promise<void> {
    this.users.push({
      id: randomUUID().toString(),
      name,
      email, 
      password,
      sessionToken: null,
    })
  }

  async getAll(): Promise<User[]> {
    const allUsers = this.users

    return allUsers
  }

  async update({ name, email, password }: NewUser, id: string): Promise<void> {
    const result = this.users.filter(user => user.id === id)

    const user = result[0]

    user.name = name
    user.email = email
    user.password = password
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id !== id)

    this.users.slice(userIndex)
  }

  async findByEmail(email: string): Promise<User> {
    const result = this.users.filter(user => user.email === email)
    const user = result[0]
    
    return user
  }

  async findById(id: string): Promise<User> {
    const result = this.users.filter(user => user.id === id)
    const user = result[0]
    
    return user
  }

  async findBySessionToken(sessionToken: string): Promise<User> {
    const result = this.users.filter(user => user.sessionToken === sessionToken)
    const user = result[0]
    
    return user
  }
}