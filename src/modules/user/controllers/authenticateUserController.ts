import { Request, Response } from "express";
import { SESSION_TOKEN } from "../../../constants/";
import { AuthenticateUserUseCase } from "../useCases/authenticateUserUseCase";
import { InfraUsersRepository } from "../repositories/infra/InfraUsersRepository";
import { AppError } from "../../../errors/AppErrors";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const infraUsersRepository = new InfraUsersRepository()
    const authRepository = new AuthenticateUserUseCase(infraUsersRepository)

    try {
      const { email, password } = req.body

      const authenticatedUser = await authRepository.execute({ email, password })

      res.cookie(SESSION_TOKEN, authenticatedUser.sessionToken, {
        domain: process.env.NODE_ENV ? 'production' : 'localhost',
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days
      })

      return res.status(200).send(authenticatedUser)
    } catch (e) {
      if (e instanceof AppError) {
        console.log('Error:', e.message)
        return res.status(e.statusCode).send({ error: e.message })
      }
      
      console.log('Error: ', e)
      return res.status(400).send()
    }
  }
}