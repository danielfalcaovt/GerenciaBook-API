/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from "../../errors/missing-param-error";
import { IValidation } from "../../protocols/validation";

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly field: string) {}
  validate(data: any): Error | null {
    if (!data[this.field]) {
      return new MissingParamError(this.field)
    } else {
      return null
    }
  }
}