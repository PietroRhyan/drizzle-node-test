import { Request, Response } from "express"
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository"
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase"

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const userRepository = new DeleteUserUseCase(infraUsersRepository)

    try {
      const { id } = req.body

      await userRepository.execute(id)

      return res.status(200).send()
    } catch (e) {
      console.log("Error: ", e)
      return res.status(400).send()
    }
  }
}