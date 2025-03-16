export const AuthConfig = Object.freeze({
  jwtSecret: process.env.JWT_SECRET!,
  bearerWord: 'Bearer'
} as const);