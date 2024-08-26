 
import { ITokenVerifier } from '../../data/protocols/cryptography/itoken-verifier'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { IMiddleware } from '../protocols/middleware'

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly tokenVerifier: ITokenVerifier) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { authorization } = httpRequest.headers
      if (!authorization) {
        return forbidden(new AccessDeniedError())
      }
      const token = authorization.replace('Bearer ', '')
      const result = await this.tokenVerifier.verify(
        token
      )
      if (!result) {
        return forbidden(new AccessDeniedError())
      }
      return new Promise((resolve) => resolve(ok({ id: result })))
    } catch (err) {
      console.log(err)
      return serverError()
    }
  }
}
