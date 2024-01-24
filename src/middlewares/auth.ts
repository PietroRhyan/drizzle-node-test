import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../constants/";
import { getUserBySessionToken } from "../modules/user/useCases/getUserBySessionTokenUseCase";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies as Object
    const hasSessionToken = sessionToken.hasOwnProperty(SESSION_TOKEN)
    const sessionTokenValue = Object.values(sessionToken)[0]

    if(!hasSessionToken) {
      return res.status(403).send({ error: 'Session token expired or invalid!' })
    }

    const result = await getUserBySessionToken(sessionTokenValue.toString())

    if (!result || result.length === 0) {
      return res.status(403).send({ error: 'User not found!' })
    }

    return next()
  } catch (e) {
    console.log('Error: ', e)
    return res.status(400)
  }
}