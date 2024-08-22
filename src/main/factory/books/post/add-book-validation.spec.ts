import { IValidation, RequiredFieldValidation } from '../../login/login-protocols'
import { ValidationComposite } from '../../login/login-protocols'
import { makeAddBookValidation } from './add-book-validation'

jest.mock('../../../../presentation/helpers/validations/validation-composite')

describe('AddBook Validations', () => {
  it('Should call ValidationComposite with correct values', async () => {
    makeAddBookValidation()
    const validations: IValidation[] = []
    for (const param of ['book_name', 'student_name', 'student_class', 'lend_day']) {
      validations.push(new RequiredFieldValidation(param))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
