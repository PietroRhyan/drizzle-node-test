// import { Request, Response } from "express";
// import { createUser } from "../useCases/createUserUseCase";
// import { getUserByEmail } from "../useCases/getUserByEmailUseCase";
// import { authentication } from "../../../modules/helpers";

// export const createUserController = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body

//     console.log("user:", name, email, password)

//     if (!name || !email || !password) {
//       return res.status(400).send({ error: "User invalid credentials: Some spelling error." })
//     }

//     const result = await getUserByEmail(email)

//     console.log(result)

//     if (!result || result.length > 0) {
//       return res.status(400).send({ error: 'User already created!' })
//     }

//     const user = await createUser({
//       name, 
//       email,
//       password: authentication(password)
//     })

//     return res.status(200).send(user).end()
//   } catch(e) {
//     console.log('Error: ', e)
//     return res.status(400)
//   }
// }