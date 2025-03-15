export const PORT = process.env.PORT || 4000;

export const StatusCode = Object.freeze({
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504
} as const);

export const CORS_OPTIONS = {
  origin: process.env.CLIENT_ORIGIN,
  optionsSuccessStatus: StatusCode.Ok
} as const;

export const UPLOADS_DIR_NAME = 'uploads';