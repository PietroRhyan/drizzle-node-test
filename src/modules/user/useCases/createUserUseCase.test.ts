import { AppError } from "../../../errors/AppErrors"
import { authentication } from "../../../modules/helpers"
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "./createUserUseCase"
import { describe, it, expect, beforeEach } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let createUser: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to create a new user", async () => {
    const testUser = {
      name: 'Pietro',
      email: 'pietro@gmail.com',
      password: 'test123'
    }

    await expect(createUser.execute(testUser)).resolves.not.toThrow()

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pietro'
        })
      ])
    )
  })

  it("should be able to encrypt the user password", async () => {
    const testUser = {
      name: "João",
      email: "joao@gmail.com",
      password: "test123"
    }

    const hashedPassword = authentication(testUser.password)

    await createUser.execute(testUser)

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          password: hashedPassword
        })
      ])
    )
  })

  it("should not be able to create an user with empty fields", async () => {
    const testUser = {
      name: "Diego",
      email: "",
      password: "test123",
    }

    await expect(createUser.execute(testUser)).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a existing user", async () => {
    expect(async () => {
      await createUser.execute({
        name: "Flavio",
        email: "flavio@gmail",
        password: "test123"
      })
  
      await createUser.execute({
        name: "Flavinho mil grau",
        email: "flavio@gmail",
        password: "test123"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})