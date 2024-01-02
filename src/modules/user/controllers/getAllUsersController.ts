import { Request, Response } from "express";
import { getAllUsers } from "../useCases/getAllUsersUseCase";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    return res.sendStatus(200).json(users)
  } catch (e) {
    console.log('Error: ', e)
    return res.sendStatus(400)
  }
}