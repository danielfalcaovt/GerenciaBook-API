import request from 'supertest'
import app from '../../../config/app'

describe('GetBy Route', () => {
  it('Should return 200 on succeed', async () => {
    await request(app)
      .get('/api/get/')
  })
})