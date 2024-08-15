/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAccount } from '../../../domain/protocols/account'
import { IAccountModel, IAddAccount } from '../../../domain/usecases/user-db/add-account'
import { IHasher } from '../../protocols/cryptography/ihasher'
import { IAddAccountRepository } from '../../protocols/db/iadd-account-repository'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
    sut: DbAddAccount
    hasherStub: IHasher
    addAccountRepoStub: IAddAccount
}

const makeSut = (): SutTypes => {
    const hasherStub = makeHasherStub()
    const addAccountRepoStub = makeAddAccountRepoStub()
    const sut = new DbAddAccount(hasherStub, addAccountRepoStub)
    return {
        sut,
        hasherStub,
        addAccountRepoStub
    }
}

const makeHasherStub = (): IHasher => {
    class HasherStub implements IHasher {
        async hash(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_value'))
        }
    }
    return new HasherStub()
}

const makeAddAccountRepoStub = (): IAddAccountRepository => {
    class AddAccountStubRepo implements IAddAccountRepository {
        add(account: IAccountModel): Promise<IAccount> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new AddAccountStubRepo()
}

const makeFakeAccount = (): IAccount => ({
    id: 'any_id',
    email: 'any_mail@mail.com',
    name: 'any_name',
    password: 'hashed_value'
})

const makeFakeRequest = (): IAccountModel => ({
    email: 'any_mail@mail.com',
    name: 'any_name',
    password: 'any_password'
})

describe('DbAddAccount', () => {
    it('Should call hasher with correct value', async () => {
        const { sut, hasherStub } = makeSut()
        const hasherSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(makeFakeRequest())
        expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })
    it('Should throw if hasher throws', async () => {
        const { sut, hasherStub } = makeSut()
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })
    it('Should call addAccountRepository with correct values', async () => {
        const { sut, addAccountRepoStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepoStub, 'add')
        await sut.add(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith({
            email: 'any_mail@mail.com',
            name: 'any_name',
            password: 'hashed_value'
        })
    })
    it('Should throw if addAccountRepository throws', async () => {
        const { sut, addAccountRepoStub } = makeSut()
        jest.spyOn(addAccountRepoStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error())
        }))
        const promise = sut.add(makeFakeRequest())
        expect(promise).rejects.toThrow()
    })
    it('Should return an account on succeed', async () => {
        const { sut } = makeSut()
        const response = await sut.add(makeFakeRequest())
        expect(response).toEqual(makeFakeAccount())
    })
})