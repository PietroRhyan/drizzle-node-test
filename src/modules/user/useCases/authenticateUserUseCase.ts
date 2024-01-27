import { authentication, generateSessionToken } from "modules/helpers";
import { UsersRepository } from "../repositories/UsersRepository";

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  id?: string
  name: string
  email: string
  password: string
  sessionToken?: string | null
}

export class AuthenticateUserUseCase {
  constructor (
    private userRepository: UsersRepository
  ) {}

  async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    if (!email || !password) {
      throw new Error("The fields 'email' and 'password' are required.")
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error("User don't exist.")
    }

    const expectedHash = authentication(password)

    if (user.password !== expectedHash) {
      throw new Error("Invalid Password")
    }

    user.sessionToken = generateSessionToken()

    console.log("User do AUTH: ", user)
    const updatedUser = await this.userRepository.update(user, user.id)
    console.log("Updated user do AUTH: ", updatedUser)

    return updatedUser
  }
}