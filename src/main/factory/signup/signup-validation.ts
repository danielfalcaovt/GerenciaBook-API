import { RequiredFieldValidation } from "../../../presentation/helpers/validations/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validations/validation-composite";
import { IValidation } from "../../../presentation/protocols/validation";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldValidation(pos))
  }
  return new ValidationComposite(validations)
}