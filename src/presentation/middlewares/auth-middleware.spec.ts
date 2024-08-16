import { AccessDeniedError } from "../errors"
import { forbidden } from "../helpers/http-helper"
import { HttpRequest } from "../protocols/http"
import { AuthMiddleware } from "./auth-middleware"

describe('Auth Middleware', () => {
  it('Should return 403 if authorization not exist', async () => {
    const sut = new AuthMiddleware()
    const httpRequest: HttpRequest = {
      headers: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})