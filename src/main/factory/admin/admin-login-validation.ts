import { EmailValidation, RequiredFieldValidation, ValidationComposite, IValidation } from './admin-login-protocols'
import { EmailValidator } from '../../../utils/email-validator/email-validator'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const pos of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(pos))
  }
  validations.push(new EmailValidation(new EmailValidator()))
  return new ValidationComposite(validations)
}
