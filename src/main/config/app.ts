import express from 'express'
import routes from './routes'
import middlewares from './middlewares'

const app = express()

routes(app)
middlewares(app)

export default app