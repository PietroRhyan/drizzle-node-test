import { UsersRepository } from "../repositories/UsersRepository";

export class DeleteUserUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute(id: string) {
    if (!id) {
      throw new Error("The field 'id' is required.")
    } 

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new Error("User don't exist.")
    }

    await this.usersRepository.delete(id)
  }  
}