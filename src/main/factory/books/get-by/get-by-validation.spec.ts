import { RequiredAtLeastOneIn } from '../../../../presentation/helpers/validations/required-at-least-one-in'
import { IValidation } from '../../login/login-protocols'
import { ValidationComposite } from '../../login/login-protocols'
import { makeGetByValidation } from './get-by-validations'

jest.mock('../../../../presentation/helpers/validations')

describe('GetBy Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeGetByValidation()
    const validations: IValidation[] = []
    const params: string[] = [
      'book_name',
      'student_name',
      'student_class',
      'lend_day'
    ]
    validations.push(new RequiredAtLeastOneIn(params))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
