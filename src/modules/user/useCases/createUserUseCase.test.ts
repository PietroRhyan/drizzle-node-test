import { authentication } from "../../../modules/helpers"
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./createUserUseCase"
import { describe, it, expect } from 'vitest'

describe('Create User Use Case', () => {
  it("should be able to create a new user", async () => {
    const inMemoryCreateUser = new InMemoryUsersRepository()
    const createUser = new CreateUserUseCase(inMemoryCreateUser)

    const testUser = {
      name: 'Pietro',
      email: 'pietro@gmail.com',
      password: 'test123'
    }

    await expect(createUser.execute(testUser)).resolves.not.toThrow()

    expect(inMemoryCreateUser.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pietro'
        })
      ])
    )
  })

  it("should be able to encrypt the user password", async () => {
    const inMemoryCreateUser = new InMemoryUsersRepository()
    const createUser = new CreateUserUseCase(inMemoryCreateUser)

    const testUser = {
      name: "João",
      email: "joao@gmail.com",
      password: "test123"
    }

    const hashedPassword = authentication(testUser.password)

    await createUser.execute(testUser)

    expect(inMemoryCreateUser.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          password: hashedPassword
        })
      ])
    )
  })
})