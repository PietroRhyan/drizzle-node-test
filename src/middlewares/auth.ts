import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../constants/";
import { InfraUsersRepository } from "modules/user/repositories/infra/InfraUsersRepository";
import { GetUserBySessionTokenUseCase } from "modules/user/useCases/getUserBySessionTokenUseCase";
import { AppError } from "../errors/AppErrors";

export class isAuthenticated {
  async handle(req: Request, res: Response, next: NextFunction) {
    const infraUsersRepository = new InfraUsersRepository()
    const userRepository = new GetUserBySessionTokenUseCase(infraUsersRepository)

    try {
      const sessionToken = req.cookies as Object
      const hasSessionToken = sessionToken.hasOwnProperty(SESSION_TOKEN)
      const sessionTokenValue = Object.values(sessionToken)[0]
  
      if(!hasSessionToken) {
        throw new AppError('Session token expired or invalid.', 401)
      }
  
      await userRepository.execute(sessionTokenValue.toString())
  
      return next()
    } catch (e) {
      if (e instanceof AppError) {
        console.log("Error:", e.message)
        return res.status(e.statusCode).send({ error: e.message })
      }

      console.log('Error:', e)
      return res.status(400).send()
    }
  }
}