import { IValidation, RequiredFieldValidation } from '../../login/login-protocols'
import { ValidationComposite } from '../../login/login-protocols'
import { makeDeleteValidation } from './delete-book-validation'

jest.mock('../../../../presentation/helpers/validations/validation-composite')

describe('GetBy Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeDeleteValidation()
    const validations: IValidation[] = []
    validations.push(new RequiredFieldValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
