/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAccount } from '../../../domain/protocols/account'
import { IHashComparer } from '../../protocols/cryptography/ihashcomparer'
import { ITokenGenerator } from '../../protocols/cryptography/itoken-generator'
import { ILoadByEmail } from '../../protocols/db/iload-by-email'
import { IUpdateAccessToken } from '../../protocols/db/iupdate-access-token'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  updateAccessTokenStub: IUpdateAccessToken
  loadAccountStub: ILoadByEmail
  tokenGeneratorStub: ITokenGenerator
  hashComparerStub: IHashComparer
}

const makeSut = (): SutTypes => {
  const updateAccessTokenStub = makeUpdateAccessTokenStub()
  const loadAccountStub = makeLoadAccountByEmail()
  const tokenGeneratorStub = makeTokenGeneratorStub()
  const hashComparerStub = makeHashComparer()
  const sut = new DbAuthentication(
    updateAccessTokenStub,
    loadAccountStub,
    tokenGeneratorStub,
    hashComparerStub
  )
  return {
    sut,
    updateAccessTokenStub,
    loadAccountStub,
    hashComparerStub,
    tokenGeneratorStub
  }
}

const makeUpdateAccessTokenStub = (): IUpdateAccessToken => {
  class updateAccessTokenStub implements IUpdateAccessToken {
    update(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }
  const _ = new updateAccessTokenStub()
  return _
}

const makeLoadAccountByEmail = (): ILoadByEmail => {
  class loadAccountByEmailStub implements ILoadByEmail {
    load(email: string): Promise<IAccount | null> {
      return new Promise((resolve) =>
        resolve({
          email: 'any_mail',
          id: 'any_id',
          name: 'any_name',
          password: 'any_hash'
        })
      )
    }
  }
  const _ = new loadAccountByEmailStub()
  return _
}

const makeHashComparer = (): IHashComparer => {
  class hashComparerStub implements IHashComparer {
    compare(password: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }
  const _ = new hashComparerStub()
  return _
}

const makeTokenGeneratorStub = (): any => {
  class tokenGeneratorStub implements ITokenGenerator {
    generate(id: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'))
    }
  }
  const _ = new tokenGeneratorStub()
  return _
}

const makeFakeAccount = () => {
  return {
    email: 'any_mail',
    password: 'any_password'
  }
}

describe('DbAuthentication Usecase', () => {
  it('Should call LoadAccountByEmail with correct values', async () => {
    const { sut, loadAccountStub } = makeSut()
    const loadAccountSpy = jest.spyOn(loadAccountStub, 'load')
    await sut.auth(makeFakeAccount())
    expect(loadAccountSpy).toHaveBeenCalledWith('any_mail')
  })
  it('Should return null if invalid credentials', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest
      .spyOn(loadAccountStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const response = await sut.auth(makeFakeAccount())
    expect(response).toBeFalsy()
  })
  it('Should throw if loadAccount throws', async () => {
    const { sut, loadAccountStub } = makeSut()
    jest.spyOn(loadAccountStub, 'load').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.auth(makeFakeAccount()) // captura a promise que o sut retorna
    await expect(promise).rejects.toThrow() // espera que a promise rejeite com um error
  })
  it('Should call HashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAccount())
    expect(hashSpy).toHaveBeenCalledWith('any_password', 'any_hash')
  })
  it('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.auth(makeFakeAccount()) // captura a promise que o sut retorna
    await expect(promise).rejects.toThrow() // espera que a promise rejeite com um error
  })
  it('Should return null if HashComparer fails', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    const response = await sut.auth(makeFakeAccount())
    expect(response).toBeFalsy()
  })
  it('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAccount())
    expect(tokenSpy).toHaveBeenCalledWith('any_id')
  })
  it('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.auth(makeFakeAccount()) // captura a promise que o sut retorna
    await expect(promise).rejects.toThrow() // espera que a promise rejeite com um error
  })
  it('Should return token on success', async () => {
    const { sut } = makeSut()
    const response = await sut.auth(makeFakeAccount())
    expect(response).toBe('any_token')
  })
  it('Should call UpdateAccessToken with correct values', async () => {
    const { sut, updateAccessTokenStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenStub, 'update')
    await sut.auth(makeFakeAccount())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })
  it('Should throw if UpdateAccessToken throws', async () => {
    const { sut, updateAccessTokenStub } = makeSut()
    jest.spyOn(updateAccessTokenStub, 'update').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.auth(makeFakeAccount()) // captura a promise que o sut retorna
    await expect(promise).rejects.toThrow() // espera que a promise rejeite com um error
  })
})