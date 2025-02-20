export const PORT = process.env.PORT || 4000;

export const StatusCodes = {
  Ok: 200,
  Created: 201,
  Deleted: 202,
  NoContent: 204,

  BadRequest: 400,
  NotFound: 404,

  ServerError: 500
} as const;

export const Routes = {
  Posts: 'posts'
} as const;

export const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const;