/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvalidParamError } from "../../errors/invalid-param-error";
import { IEmailValidation } from "../../protocols/email-validation";
import { IValidation } from "../../protocols/validation";

export class EmailValidation implements IValidation {
  constructor(private readonly emailValidator: IEmailValidation) {}
  validate(data: any): Error | null {
    if (!this.emailValidator.isValid(data.email)) {
      return new InvalidParamError('email')
    }
    return null
  }
}