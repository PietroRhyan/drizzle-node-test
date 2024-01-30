import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../useCases/getAllUsersUseCase";
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository";
import { AppError } from "../../../errors/AppErrors";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const usersRepository = new GetAllUsersUseCase(infraUsersRepository)

    try {
      const users = await usersRepository.execute()

      return res.status(200).send(users)
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