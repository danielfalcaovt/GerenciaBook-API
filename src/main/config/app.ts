import express from 'express'
import authRoutes from './routes/auth-routes'
import middlewares from './middlewares'
import authMiddleware from '../middlewares/auth-middleware/auth-middleware'
import apiRoutes from './routes/api-routes'
import adminRoutes from './routes/admin-routes'

const app = express()

middlewares(app)
authRoutes(app)
app.use(authMiddleware)
adminRoutes(app)
apiRoutes(app)

export default app