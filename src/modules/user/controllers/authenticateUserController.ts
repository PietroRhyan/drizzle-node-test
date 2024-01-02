import { Request, Response } from "express";
import { updateUser } from '../useCases/updateUserUseCase'
import { getUserByEmail } from "../useCases/getUserByEmailUseCase";
import { authentication } from "src/modules/helpers";
import { SESSION_TOKEN } from "src/constants/";

export const authenticateUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.sendStatus(400)
    }

    const result = await getUserByEmail(email)

    if (!result || result.length === 0) {
      return res.sendStatus(400).json({ error: 'User not found!' })
    }

    const user = result[0]

    const expectedHash = authentication(password)

    if (user.password !== expectedHash) {
      return res.sendStatus(403).json({ error: 'User unauthorized!' })
    }

    user.sessionToken = expectedHash

    const updatedUser = await updateUser(user, user.id)

    res.cookie(SESSION_TOKEN, user.sessionToken, {
      domain: process.env.NODE_ENV ? 'production' : 'localhost',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3) // 3 days
    })
    
    return res.sendStatus(200).json(updatedUser).end()
  } catch (e) {
    console.log('Error: ', e)
    return res.sendStatus(400)
  }
}