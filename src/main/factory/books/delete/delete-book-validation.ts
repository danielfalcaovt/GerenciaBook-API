import { RequiredFieldValidation } from "../get-by/get-by-protocols";
import { IValidation, ValidationComposite } from "./delete-book-protocols";

export const makeDeleteValidation = (): IValidation => {
  const validations: IValidation[] = []
  validations.push(new RequiredFieldValidation('id'))
  return new ValidationComposite(validations)
}