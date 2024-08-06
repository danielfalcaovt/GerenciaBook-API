import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): SignUpController => {
  const signUpController = new SignUpController(makeSignUpValidation())
  return signUpController
}