import { Request, Response } from "express";
import { CreateUserUseCase } from "../useCases/createUserUseCase";
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository";
import { AppError } from "errors/AppErrors";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const usersRepository = new CreateUserUseCase(infraUsersRepository)

    try {
      const { name, email, password } = req.body

      await usersRepository.execute({ name, email, password })

      return res.status(201).send()
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
