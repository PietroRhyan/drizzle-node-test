import { Request, Response } from "express"
import { UpdateUserUseCase } from "../useCases/updateUserUseCase"
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository"

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const usersRepository = new UpdateUserUseCase(infraUsersRepository)

    try {
      const { id, name, email, password } = req.body

      await usersRepository.execute({ name, email, password }, id)

      return res.status(200).send()
    } catch (e) {
      console.log("Error: ", e)
      return res.status(400).send()
    }
  }
}