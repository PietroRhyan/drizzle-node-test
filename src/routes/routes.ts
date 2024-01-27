import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { AuthenticateUserController } from '../modules/user/controllers/authenticateUserController'
import { CreateUserController } from '../modules/user/controllers/createUserController'
import { GetAllUsersController } from '../modules/user/controllers/getAllUsersController'
import { DeleteUserController } from 'modules/user/controllers/deleteUserController'
import { UpdateUserController } from 'modules/user/controllers/updateUserController'

const router = Router()

const auth = new isAuthenticated()

const createUserController = new CreateUserController()
const authenticatedUserController = new AuthenticateUserController()
const getAllUsersController = new GetAllUsersController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

router.post('/create-user', createUserController.handle)
router.post('/login', authenticatedUserController.handle)

router.get('/get-users', auth.handle, getAllUsersController.handle)
router.delete('/delete-user', auth.handle, deleteUserController.handle)
router.post('/update-user', auth.handle, updateUserController.handle)

export default router