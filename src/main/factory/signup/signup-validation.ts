import { EmailValidation, IValidation, RequiredFieldValidation, ValidationComposite } from './signup-protocols'
import { EmailValidator } from "../../../utils/email-validator/email-validator";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const pos of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new RequiredFieldValidation(pos))
  }
  validations.push(new EmailValidation(new EmailValidator()))
  return new ValidationComposite(validations)
}