/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HttpRequest {
  body?: any
  headers?: any
  query?: any
}

export interface HttpResponse {
  body?: any
  statusCode: number
}
