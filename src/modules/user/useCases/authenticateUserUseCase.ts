import { authentication, generateSessionToken } from "../../helpers";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "../../../errors/AppErrors";

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
      throw new AppError("The fields 'email' and 'password' are required.")
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User don't exist.")
    }

    const expectedHash = authentication(password)

    if (user.password !== expectedHash) {
      throw new AppError("Invalid Password")
    }

    user.sessionToken = generateSessionToken()

    const updatedUser = await this.userRepository.update(user, user.id)

    return updatedUser
  }
}