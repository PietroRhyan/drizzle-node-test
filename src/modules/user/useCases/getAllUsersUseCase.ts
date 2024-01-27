import { UsersRepository } from "../repositories/UsersRepository";

interface GetAllUsersUseCaseResponse {
  id: string
  name: string
  email: string
  password: string
  sessionToken: string | null
}

export class GetAllUsersUseCase {
  constructor (
    private userRepository: UsersRepository
  ) {}

  async execute(): Promise<GetAllUsersUseCaseResponse[]> {
    const users = await this.userRepository.getAll()

    return users
  }
}