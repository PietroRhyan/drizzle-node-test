import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../constants/";
import { InfraUsersRepository } from "modules/user/repositories/infra/InfraUsersRepository";
import { GetUserBySessionTokenUseCase } from "modules/user/useCases/getUserBySessionTokenUseCase";

export class isAuthenticated {
  async handle(req: Request, res: Response, next: NextFunction) {
    const infraUsersRepository = new InfraUsersRepository()
    const userRepository = new GetUserBySessionTokenUseCase(infraUsersRepository)

    try {
      const sessionToken = req.cookies as Object
      const hasSessionToken = sessionToken.hasOwnProperty(SESSION_TOKEN)
      const sessionTokenValue = Object.values(sessionToken)[0]
  
      if(!hasSessionToken) {
        return res.status(403).send({ error: 'Session token expired or invalid.' })
      }
  
      const result = await userRepository.execute(sessionTokenValue.toString())
  
      if (!result) {
        return res.status(403).send({ error: 'User not found!' })
      }
  
      return next()
    } catch (e) {
      console.log('Error: ', e)
      return res.status(400)
    }
  }
}