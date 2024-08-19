import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

jest.mock("../auth-middleware/auth-middleware", () => jest.fn((req, res, next) => next()));

describe('cors', () => {
  it('Should access-control-allow-origin be *', async () => {
    app.get('/test_cors', (req: Request, res: Response) => {
      res.send({})
    })
    await request(app)
      .get('/test_cors')
      .expect("access-control-allow-origin", '*')
      .expect("access-control-allow-headers", '*')
      .expect("access-control-allow-methods", '*')
  })
})