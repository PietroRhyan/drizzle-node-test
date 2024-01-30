import { AppError } from "../../../errors/AppErrors"
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./createUserUseCase"
import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteUserUseCase } from "./deleteUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository

let createUser: CreateUserUseCase
let deleteUser: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    createUser = new CreateUserUseCase(inMemoryUsersRepository)
    deleteUser = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to delete an user", async () => {
    const testUser = {
      name: 'Boeing',
      email: 'boeing@gmail.com',
      password: 'test123'
    }

    await createUser.execute(testUser)

    const result = inMemoryUsersRepository.users.filter(user => user.email === testUser.email)
    const user = result[0]

    await expect(deleteUser.execute(user.id)).resolves.not.toThrow()
  })

  it("should not be able to delete an inexistent user", async () => {
    await expect(deleteUser.execute("umIdFake")).rejects.toBeInstanceOf(AppError)
  })
})