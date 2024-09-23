import { RequiredAtLeastOneIn } from "../../../../presentation/helpers/validations/required-at-least-one-in";
import { IValidation, ValidationComposite } from "./get-by-protocols";

export const makeGetByValidation = (): IValidation => {
  const validations: IValidation[] = []
  const parameters = ['book_name', 'student_name','student_class' ,'lend_day', 'phone']
  const validation = new RequiredAtLeastOneIn(parameters)
  validations.push(validation)
  return new ValidationComposite(validations)
}