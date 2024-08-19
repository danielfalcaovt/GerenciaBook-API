import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

jest.mock("../auth-middleware/auth-middleware", () => jest.fn((req, res, next) => next()));

describe('BodyParser', () => {
  it('Should parser body as json', async () => {
    app.post('/test_bodyparser', (req: Request, res: Response) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_bodyparser')
      .send({field: 'any_value'})
      .expect({field: 'any_value'})
  })
})