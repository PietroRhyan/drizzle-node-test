import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./createUserUseCase";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { authentication } from "../../helpers";
import { AppError } from "../../../errors/AppErrors";

let inMemoryUsersRepository: InMemoryUsersRepository

let createUser: CreateUserUseCase
let updateUser: UpdateUserUseCase

describe("Update User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    createUser = new CreateUserUseCase(inMemoryUsersRepository)
    updateUser = new UpdateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to update an user", async () => {
    const testUser = {
      name: "Logitech",
      email: "logitech@gmail.com",
      password: "test123"
    }

    await createUser.execute(testUser)

    const result = inMemoryUsersRepository.users.filter(user => user.email === testUser.email)
    const user = result[0]

    await expect(updateUser.execute({ 
      name: testUser.email, 
      email: "logitechnewestemail@gmail.com", 
      password: testUser.password 
    }, user.id)).resolves.not.toThrow()

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: "logitechnewestemail@gmail.com",
        })
      ])
    )
  })

  it("should be able to update an user with some empty fields", async () => {
    const testUser = {
      name: "Razer",
      email: "razer@gmail.com",
      password: "test123"
    }

    await createUser.execute(testUser)

    const result = inMemoryUsersRepository.users.filter(user => user.email === testUser.email)
    const user = result[0]

    await expect(updateUser.execute({ 
      name: "", 
      email: "", 
      password: "" 
    }, user.id)).resolves.not.toThrow()

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testUser.name,
          email: testUser.email,
          password: authentication(testUser.password),
        })
      ])
    )
  })

  it("should not be able to update an inexistent user", async () => {
    await expect(updateUser.execute({ 
      name: "Um nome muito louco e fake", 
      email: "fakeemailomgwtf@louco.com", 
      password: "test123" 
    }, "fakeidnovamentekkk")).rejects.toBeInstanceOf(AppError)
  })
})