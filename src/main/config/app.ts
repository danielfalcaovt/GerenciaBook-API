import express from 'express'
import authRoutes from './routes/auth-routes'
import middlewares from './middlewares'
import authMiddleware from '../middlewares/auth-middleware/auth-middleware'
import apiRoutes from './routes/api-routes'

const app = express()

middlewares(app)
authRoutes(app)
app.use(authMiddleware)
apiRoutes(app)

export default app