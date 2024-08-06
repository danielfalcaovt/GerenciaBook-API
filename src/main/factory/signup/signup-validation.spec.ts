import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite'
import { IValidation } from '../../../presentation/protocols/validation'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validations/validation-composite')

describe('SignUp Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})