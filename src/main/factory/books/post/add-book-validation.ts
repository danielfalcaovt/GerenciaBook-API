import { IValidation, RequiredFieldValidation, ValidationComposite } from "../get-by/get-by-protocols";

export const makeAddBookValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const param of ['book_name', 'student_name', 'student_class', 'lend_day']) {
    validations.push(new RequiredFieldValidation(param))
  }
  return new ValidationComposite(validations)
}