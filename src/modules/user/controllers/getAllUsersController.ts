import { Request, Response } from "express";
import { getAllUsers } from "../useCases/getAllUsersUseCase";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    return res.status(200).send(users)
  } catch (e) {
    console.log('Error: ', e)
    return res.status(400)
  }
}