import { Router } from 'express'
import { isAuthenticated } from 'src/middlewares/auth'
import { authenticateUserController } from 'src/modules/user/controllers/authenticateUserController'
import { createUserController } from 'src/modules/user/controllers/createUserController'
import { getAllUsersController } from 'src/modules/user/controllers/getAllUsersController'

const router = Router()

router.post('/create-user', createUserController)
router.post('/login', authenticateUserController)
router.get('/get-users', isAuthenticated, getAllUsersController)

export default router