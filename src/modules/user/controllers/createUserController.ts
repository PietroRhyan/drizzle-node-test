import { Request, Response } from "express";
import { createUser } from "../useCases/createUserUseCase";
import { getUserByEmail } from "../useCases/getUserByEmailUseCase";
import { authentication } from "src/modules/helpers";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.sendStatus(400)
    }

    const result = await getUserByEmail(email)

    if (!result || result.length > 0) {
      return res.sendStatus(400).json({ error: 'User already created!' })
    }

    const user = await createUser({
      name, 
      email,
      password: authentication(password)
    })

    return res.sendStatus(200).json(user).end()
  } catch(e) {
    console.log('Error: ', e)
    return res.sendStatus(400)
  }
}