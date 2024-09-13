import { EmailValidation, IValidation, RequiredFieldValidation, ValidationComposite, } from './admin-login-protocols'
import { EmailValidator } from '../../../utils/email-validator/email-validator'
import { makeLoginValidation } from './admin-login-validation'

jest.mock('../../../presentation/helpers/validations/validation-composite')

describe('AdminLogin Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const pos of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(pos))
    }
    validations.push(new EmailValidation(new EmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})