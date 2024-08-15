import { EmailValidation } from "../../../presentation/helpers/validations/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validations/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validations/validation-composite";
import { IValidation } from "../../../presentation/protocols/validation";
import { EmailValidator } from "../../../utils/email-validator/email-validator";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const pos of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(pos))
  }
  validations.push(new EmailValidation(new EmailValidator()))
  return new ValidationComposite(validations)
}