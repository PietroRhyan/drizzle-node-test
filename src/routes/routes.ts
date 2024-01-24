import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { authenticateUserController } from '../modules/user/controllers/authenticateUserController'
import { createUserController } from '../modules/user/controllers/createUserController'
import { getAllUsersController } from '../modules/user/controllers/getAllUsersController'
import { deleteUserController } from 'modules/user/controllers/deleteUserController'
import { updateUserController } from 'modules/user/controllers/updateUserController'

const router = Router()

router.post('/create-user', createUserController)
router.post('/login', authenticateUserController)

router.get('/get-users', isAuthenticated, getAllUsersController)
router.delete('/delete-user', isAuthenticated, deleteUserController)
router.post('/update-user', isAuthenticated, updateUserController)

export default router