import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "src/constants/";
import { getUserBySessionToken } from "src/modules/user/useCases/getUserBySessionTokenUseCase";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies(SESSION_TOKEN)

    if(!sessionToken) {
      return res.sendStatus(403).json({ error: 'Session token expired or invalid!' })
    }

    const result = await getUserBySessionToken(sessionToken)

    if (!result || result.length === 0) {
      return res.sendStatus(403).json({ error: 'User not found!' })
    }

    return next()
  } catch (e) {
    console.log('Error: ', e)
    return res.sendStatus(400)
  }
}