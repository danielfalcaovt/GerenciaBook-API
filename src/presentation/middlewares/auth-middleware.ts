/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { Decrypter } from '../../data/protocols/cryptography/decrypter'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { IMiddleware } from '../protocols/middleware'

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly decrypter: Decrypter) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { authorization } = httpRequest.headers
      if (!authorization) {
        return Promise.resolve(forbidden(new AccessDeniedError()))
      }
      const token = authorization.replace('Bearer ', '')
      const result = await this.decrypter.decrypt(
        token
      )
      if (!result) {
        return Promise.resolve(forbidden(new AccessDeniedError()))
      }
      return new Promise((resolve) => resolve(ok({ id: result })))
    } catch (err) {
      return serverError()
    }
  }
}
