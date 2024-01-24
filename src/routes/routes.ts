import { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { authenticateUserController } from '../modules/user/controllers/authenticateUserController'
import { createUserController } from '../modules/user/controllers/createUserController'
import { getAllUsersController } from '../modules/user/controllers/getAllUsersController'

const router = Router()

router.post('/create-user', createUserController)
router.post('/login', authenticateUserController)
router.get('/get-users', isAuthenticated, getAllUsersController)

export default router