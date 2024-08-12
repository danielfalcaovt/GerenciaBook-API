import { Request, Response } from "express"
import app from "../../config/app"
import request from 'supertest'

describe('ContentType', () => {
  it('Should default be json', async () => {
    app.get('/test_contenttype', (req: Request, res: Response) => {
      res.send({ ok: 'hello world' })
    })

    await request(app)
      .get('/test_contenttype')
      .expect('content-type', /json/)
  })
})