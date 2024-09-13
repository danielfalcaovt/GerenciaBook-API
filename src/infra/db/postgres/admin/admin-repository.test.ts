import { PgHelper } from '../helpers/pg-helper'
import { PgAdminRepository } from './admin-repository'

describe('PgAdminRepository', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
    return
  })

  afterEach(async () => {
    PgHelper.query('DELETE FROM admins').then(() => {})
    return
  })

  afterEach(async () => {
    PgHelper.query('DELETE FROM admins').then(() => {})
    return
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM admins').then(() => {})
    return
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
    return
  })

  describe('load by email', () => {
    const email = 'any_mail@mail.com'
    it('Should call query with correct value', async () => {
      const sut = new PgAdminRepository()
      const querySpy = jest.spyOn(PgHelper, 'query')
      await sut.load(email)
      expect(querySpy).toHaveBeenCalledWith(
        expect.anything(),
        expect.arrayContaining([email])
      )
    })
    it('Should return an account on succeed', async () => {
      await PgHelper.query(
        'INSERT INTO admins(email, password) VALUES($1, $2)',
        ['any_mail@mail.com', 'any_password']
      )
      const sut = new PgAdminRepository()
      const account = await sut.load('any_mail@mail.com')
      expect(account?.id).toBeTruthy()
      expect(account?.email).toBe('any_mail@mail.com')
    })
    it('Should not return on fail', async () => {
      const sut = new PgAdminRepository()
      const error = await sut.load('inexistent_email@mail.com')
      expect(error).toBeFalsy()
    })
    it('Should throw if query throws', async () => {
      const sut = new PgAdminRepository()
      jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.load('any_mail@mail.com')
      expect(promise).rejects.toThrow()
    })
  })
})
