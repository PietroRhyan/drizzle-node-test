import { Request, Response } from "express"
import { getUserById } from "../useCases/getUserByIdUseCase"
import { updateUser } from "../useCases/updateUserUseCase"

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body

    if (!id ) {
      return res.status(400).send({ error: "User id most be provided!" })
    }

    const result = await getUserById(id) 

    const user = result[0]

    if (!user) {
      return res.status(400).send({ error: "User not found!" })
    }

    if (name || email || password) {
      user.name = name ?? user.name
      user.email = email ?? user.email
      user.password = password ?? user.password
    }

    const updatedUser = await updateUser(user, user.id)
    return res.status(200).send(updatedUser)
  } catch (e) {
    console.log("Error: ", e)
    return res.status(400)
  }
}