import { ITokenVerifier } from "../../data/protocols/cryptography/itoken-verifier";
import { AccessDeniedError } from "../errors";
import { forbidden, ok } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middleware";

export class AuthMiddleware implements IMiddleware {
  constructor (private readonly tokenVerifier: ITokenVerifier) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.headers.authorization) {
      return forbidden(new AccessDeniedError())
    }
    const result = await this.tokenVerifier.verify(httpRequest.headers.authorization)
    if (!result) {
      return forbidden(new AccessDeniedError())
    }
    return new Promise(resolve => resolve(ok({})))
  }
}