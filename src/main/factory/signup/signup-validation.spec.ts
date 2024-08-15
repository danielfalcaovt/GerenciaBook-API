import { IValidation, ValidationComposite, EmailValidation, RequiredFieldValidation } from './signup-protocols'
import { EmailValidator } from '../../../utils/email-validator/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validations/validation-composite')

describe('SignUp Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldValidation(pos))
    }
    validations.push(new EmailValidation(new EmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})