import { Request, Response } from "express";
import { updateUser } from '../useCases/updateUserUseCase'
import { getUserByEmail } from "../useCases/getUserByEmailUseCase";
import { authentication, generateSessionToken } from "../../../modules/helpers";
import { SESSION_TOKEN } from "../../../constants/";

export const authenticateUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ error: "User invalid credentials: Some spelling error." })
    }

    const result = await getUserByEmail(email)

    if (!result || result.length === 0) {
      return res.status(400).send({ error: 'User not found!' })
    }

    const user = result[0]

    const expectedHash = authentication(password)

    if (user.password !== expectedHash) {
      return res.status(403).send({ error: 'User unauthorized!' })
    }

    user.sessionToken = generateSessionToken()

    const updatedUser = await updateUser(user, user.id)

    res.cookie(SESSION_TOKEN, user.sessionToken, {
      domain: process.env.NODE_ENV ? 'production' : 'localhost',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days
    })
    
    return res.status(200).send(updatedUser).end()
  } catch (e) {
    console.log('Error: ', e)
    return res.status(400)
  }
}