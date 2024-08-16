import { AccessDeniedError } from "../errors";
import { forbidden, ok } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middleware";

export class AuthMiddleware implements IMiddleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.headers.authorization) {
      return forbidden(new AccessDeniedError())
    }
    return new Promise(resolve => resolve(ok({})))
  }
}