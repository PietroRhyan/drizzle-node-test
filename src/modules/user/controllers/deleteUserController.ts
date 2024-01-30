import { Request, Response } from "express"
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository"
import { DeleteUserUseCase } from "../useCases/deleteUserUseCase"
import { AppError } from "../../../errors/AppErrors"

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const userRepository = new DeleteUserUseCase(infraUsersRepository)

    try {
      const { id } = req.body

      await userRepository.execute(id)

      return res.status(200).send()
    } catch (e) {
      if (e instanceof AppError) {
        console.log("Error:", e.message)
        return res.status(e.statusCode).send({ error: e.message })
      }

      console.log("Error:", e)
      return res.status(400).send()
    }
  }
}