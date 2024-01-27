import { AppError } from "errors/AppErrors";
import { UsersRepository } from "../repositories/UsersRepository";
import { authentication } from "modules/helpers";

interface UpdateUserUseCaseReqRes {
  id?: string
  name: string
  email: string
  password: string
  sessionToken?: string | null
}

export class UpdateUserUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, name, password, sessionToken }: UpdateUserUseCaseReqRes, id: string): Promise<UpdateUserUseCaseReqRes> {
    if (!id) {
      throw new AppError("The field 'id' is required.")
    }

    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError("User don't exist.")
    }

    const updatedUser = await this.usersRepository.update({
      name: name.length > 0 ? name : user.name,
      email: email.length > 0 ? email : user.email,
      password: password.length > 0 ? authentication(password) : user.password,
      sessionToken: sessionToken ?? null
    }, id)

    return updatedUser
  }
}