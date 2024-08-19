import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

describe('AuthMiddleware', () => {
  it('Should return 403 if user is not authenticated', async () => {
    app.get('/middleware_test', (req: Request, res: Response) => {
      res.send('any_response')
    })
    await request(app)
      .get('/middleware_test')
      .expect(403)
  })
})