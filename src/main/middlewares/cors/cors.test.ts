import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

jest.mock("../auth-middleware/auth-middleware", () => jest.fn((req, res, next) => next()));

describe('cors', () => {
  it('Should access-control-allow-origin be *', async () => {
    app.get('/test_cors', (req: Request, res: Response) => {
      res.send({})
    })
    
    const response = await request(app)
      .get('/test_cors')
      .set('Origin', 'https://random.com')
    expect(response.statusCode).toBe(200)
    expect(response.headers['access-control-allow-origin']).toBe('*')
  })
})