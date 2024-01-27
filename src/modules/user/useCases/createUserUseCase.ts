import { authentication } from "modules/helpers";
import { UsersRepository } from "../repositories/UsersRepository";

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
      throw new Error("The fields 'name', 'email' and 'password' is required.")
    }

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error("User already exists.")
    }

    await this.usersRepository.create({ name, email, password: authentication(password) })
  }
}