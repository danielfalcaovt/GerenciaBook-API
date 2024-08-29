/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'
import { Unauthorized } from '../errors/unauthorized'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError().message
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Unauthorized().message
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})