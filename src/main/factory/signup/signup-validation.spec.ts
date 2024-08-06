import { RequiredFieldValidation } from '../../../presentation/helpers/validations/required-field-validation'
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { IValidation } from '../../../presentation/protocols/validation'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validations/validation-composite')

describe('SignUp Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldValidation(pos))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})