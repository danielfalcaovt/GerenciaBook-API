/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from "../../errors";
import { IValidation } from "../../protocols/validation";

export class RequiredAtLeastOneIn implements IValidation {
  constructor(private readonly parameters: string[]) {}
  validate(data: any): Error | null {
    let missingParams = 0
    for (const param of this.parameters) {
      if (!data[param]) {
        missingParams++
      }
    }
    if (missingParams === this.parameters.length) {
      return new MissingParamError('required at least a param')
    } else {
      return null
    }
  }
}