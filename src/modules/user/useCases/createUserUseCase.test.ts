import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { createUserUseCase } from "./createUserUseCase"

describe('Create User Use Case', () => {
  it("should be able to create a new user", async () => {
    const inMemoryCreateUser = new InMemoryUsersRepository()
    const createUser = new createUserUseCase(inMemoryCreateUser)

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
})