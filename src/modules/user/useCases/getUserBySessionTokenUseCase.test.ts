import { describe, beforeEach, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./createUserUseCase";
import { GetUserBySessionTokenUseCase } from "./getUserBySessionTokenUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";
import { authentication } from "../../helpers/";
import { AppError } from "../../../errors/AppErrors";

let inMemoryUsersRepository: InMemoryUsersRepository

let createUser: CreateUserUseCase
let authenticateUser: AuthenticateUserUseCase
let getUserBySessionToken: GetUserBySessionTokenUseCase

describe("Get User By Session Token User Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    createUser = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUser = new AuthenticateUserUseCase(inMemoryUsersRepository)
    getUserBySessionToken = new GetUserBySessionTokenUseCase(inMemoryUsersRepository)
  })

  it("should be able to get an user by session token", async () => {
    const testUser = {
      name: "Pinoquio",
      email: "pinoquio@gmail.com",
      password: "test123"
    }

    await createUser.execute(testUser)
    const authUser = await authenticateUser.execute({ email: testUser.email, password: testUser.password })

    await expect(getUserBySessionToken.execute(authUser.sessionToken!)).resolves.not.toThrow()

    const user = await getUserBySessionToken.execute(authUser.sessionToken!)

    expect(user).toEqual(
      expect.objectContaining({
        name: testUser.name,
        email: testUser.email,
        password: authentication(testUser.password),
      })
    )
  })

  it("should not be able to get an unauthenticated user", async () => {
    const testUser = {
      name: "Carros",
      email: "carros@gmail.com",
      password: "test123"
    }

    await createUser.execute(testUser)
    await authenticateUser.execute({ email: testUser.email, password: testUser.password })

    await expect(getUserBySessionToken.execute("sdfjsdf")).rejects.toBeInstanceOf(AppError)
  })
})