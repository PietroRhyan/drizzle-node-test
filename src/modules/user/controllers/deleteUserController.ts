import { Request, Response } from "express"
import { deleteUser } from '../useCases/deleteUserUseCase'
import { getUserById } from "../useCases/getUserByIdUseCase"

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).send({ error: "User invalid credentials: Some spelling error." })
    }

    const result = await getUserById(id)

    const user = result[0]

    if (!user) {
      return res.status(400).send({ error: "User not found!"})
    }

    const deletedUser = await deleteUser(user.id)
    return res.status(200).send(deletedUser)
  } catch (e) {
    console.log("Error: ", e)
    return res.status(400)
  }
}