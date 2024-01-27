import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../useCases/getAllUsersUseCase";
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const usersRepository = new GetAllUsersUseCase(infraUsersRepository)

    try {
      const users = await usersRepository.execute()

      return res.status(200).send(users)
    } catch (e) {
      console.log("Error: ", e)
      return res.status(400).send()
    }
  }
}