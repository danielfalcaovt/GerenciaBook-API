import { IEmailValidation } from "../../presentation/protocols/email-validation";
import { isEmail } from "validator";

export class EmailValidator implements IEmailValidation {
  isValid(email: string): boolean {
    return isEmail(email)
  }
}