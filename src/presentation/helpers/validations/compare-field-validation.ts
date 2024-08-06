/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvalidParamError } from "../../errors/invalid-param-error";
import { IValidation } from "../../protocols/validation";

export class CompareFieldValidation implements IValidation {
  constructor(
    private readonly firstField: string,
    private readonly secondField: string
  ) {}
  validate(data: any): Error | null {
    if (data[this.firstField] !== data[this.secondField]) {
      return new InvalidParamError('confirmPassword')
    } else {
      return null
    }
  }
}