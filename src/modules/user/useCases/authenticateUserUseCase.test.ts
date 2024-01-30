import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./createUserUseCase"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { AppError } from "../../../errors/AppErrors"

let inMemoryUsersRepository: InMemoryUsersRepository

let createUser: CreateUserUseCase
let authenticateUser: AuthenticateUserUseCase

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    createUser = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUser = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to authenticate an user", async () => {
    const testUser = {
      name: "Lucas",
      email: "lucas@gmail.com",
      password: "test123"
    }

    await createUser.execute(testUser)
    await expect(authenticateUser.execute({ email: testUser.email, password: testUser.password })).resolves.not.toThrow()
    
    expect(inMemoryUsersRepository.users).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          sessionToken: undefined || null
        })
      ])
    )
  })

  it("should not be able to authenticate an user with empty fields", async () => {
    const testUser = {
      name: "Pipa",
      email: "pipa@gmail.com",
      password: "test123",
    }

    await createUser.execute(testUser)
    await expect(authenticateUser.execute({ email: "", password: testUser.password })).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate an inexistent user", async () => {
    await expect(authenticateUser.execute({ 
      email: "fakeemail@test.com", 
      password: "213231" 
    })).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate an user with wrong password", async () => {
    const testUser = {
      name: "Tesla",
      email: "tesla@gmail.com",
      password: "test123",
    }

    await createUser.execute(testUser)
    await expect(authenticateUser.execute({ email: testUser.email, password: "wrongPasswordUau"})).rejects.toBeInstanceOf(AppError)
  })
})