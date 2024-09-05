import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

jest.mock("../auth-middleware/auth-middleware", () => jest.fn((req, res, next) => next()));

describe('ExpressRateLimit', () => {
  it('Should return 200 if limit was not reach', async () => {
    for (let i = 0; i < 10; i++) {
      app.get('/test_ratelimit', (req: Request, res: Response) => {
        res.send({ responde: 'any_response' })
      })
      await request(app)
        .get('/test_ratelimit')
        .expect(200)
    }
  })
})