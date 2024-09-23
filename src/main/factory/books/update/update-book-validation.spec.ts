import { RequiredAtLeastOneIn } from '../../../../presentation/helpers/validations/required-at-least-one-in'
import { makeUpdateBookValidation } from './update-book-validations'
import { IValidation, RequiredFieldValidation, ValidationComposite } from './update-protocols'

jest.mock('../../../../presentation/helpers/validations/validation-composite')

describe('updateBook Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeUpdateBookValidation()
    const validations: IValidation[] = []
    validations.push(new RequiredFieldValidation('id'))
    const params: string[] = [
      'book_name',
      'student_name',
      'student_class',
      'lend_day',
      'phone'
    ]
    validations.push(new RequiredAtLeastOneIn(params))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
