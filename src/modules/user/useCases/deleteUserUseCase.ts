import { AppError } from "errors/AppErrors";
import { UsersRepository } from "../repositories/UsersRepository";

export class DeleteUserUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute(id: string) {
    if (!id) {
      throw new AppError("The field 'id' is required.")
    } 

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new AppError("User don't exist.")
    }

    await this.usersRepository.delete(id)
  }  
}