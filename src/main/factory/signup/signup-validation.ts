import { ValidationComposite } from "../../../presentation/helpers/validations/validation-composite";
import { IValidation } from "../../../presentation/protocols/validation";

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  
  return new ValidationComposite(validations)
}