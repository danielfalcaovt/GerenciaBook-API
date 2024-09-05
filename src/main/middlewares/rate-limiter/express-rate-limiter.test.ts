import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

jest.mock("../auth-middleware/auth-middleware", () => jest.fn((req, res, next) => next()));

describe('ExpressRateLimit', () => {
  it('Should return 200 if limit was not reach', async () => {
    app.get('/test_ratelimit', (req: Request, res: Response) => {
      res.send({ responde: 'any_response' })
    })
    for (let i = 0; i < 101; i++) {
      await request(app)
        .get('/test_ratelimit')
        .expect(i > 100 ? 429 : 200)
    }
  })
})