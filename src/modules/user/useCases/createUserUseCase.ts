import { authentication } from "modules/helpers";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "errors/AppErrors";

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    if (!name || !email || !password) {
      throw new AppError("The fields 'name', 'email' and 'password' is required.")
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError("User already exists.")
    }

    await this.usersRepository.create({ name, email, password: authentication(password) })
  }
}