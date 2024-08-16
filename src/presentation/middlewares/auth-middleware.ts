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
    await this.tokenVerifier.verify(httpRequest.headers.authorization)
    return new Promise(resolve => resolve(ok({})))
  }
}