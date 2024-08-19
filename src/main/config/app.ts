import express from 'express'
import authRoutes from './auth-routes'
import middlewares from './middlewares'
import authMiddleware from '../middlewares/auth-middleware/auth-middleware'

const app = express()

middlewares(app)
authRoutes(app)
app.use(authMiddleware)


export default app