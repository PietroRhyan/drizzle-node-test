import { UsersRepository } from "../repositories/UsersRepository";

interface GetUserBySessionTokenUseCaseResponse {
  id: string
  name: string
  email: string
  password: string
  sessionToken: string | null
}

export class GetUserBySessionTokenUseCase {
  constructor(
    private userRepository: UsersRepository
  ) {}

  async execute(sessionToken: string): Promise<GetUserBySessionTokenUseCaseResponse> {
    const user = await this.userRepository.findBySessionToken(sessionToken)

    if (!user) {
      throw new Error("User don't exist.")
    }

    return user
  }
}