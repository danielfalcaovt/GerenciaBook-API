/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IValidation } from '../../protocols/validation'
import { SignUpController } from './signup'

interface SutTypes {
    sut: SignUpController
    validationStub: IValidation
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidationStub()
    const sut = new SignUpController(validationStub)
    return {
        sut,
        validationStub
    }
}

const makeValidationStub = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(data: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}

describe('SignUpController', () => {
    it('Should call validations with correct value', async () => {
        const { sut, validationStub }= makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_mail@mail.com',
                password: 'any_password',
                confirmPassword: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
})