import { Router } from 'express'
import { createUser, teste } from '../controllers/UserController'

const routes = Router()

routes.get('/teste', teste)
routes.post('/user', createUser)

export default routes
