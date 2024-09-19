import express from 'express'
import authRoutes from './routes/auth-routes'
import middlewares from './middlewares'
import apiRoutes from './routes/api-routes'
import adminRoutes from './routes/admin-routes'

const app = express()

middlewares(app)
authRoutes(app)
adminRoutes(app)
apiRoutes(app)

export default app