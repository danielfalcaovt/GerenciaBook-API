import { RequiredAtLeastOneIn } from '../../../../presentation/helpers/validations/required-at-least-one-in'
import { IValidation, ValidationComposite } from './update-protocols'
import { RequiredFieldValidation } from './update-protocols'

export const makeUpdateBookValidation = (): IValidation => {
  const validations: IValidation[] = []
  validations.push(new RequiredFieldValidation('id'))
  const params: string[] = [
    'book_name',
    'student_name',
    'student_class',
    'lend_day'
  ]
  validations.push(new RequiredAtLeastOneIn(params))
  return new ValidationComposite(validations)
}
