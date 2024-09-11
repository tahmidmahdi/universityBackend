import jwt from 'jsonwebtoken'

export const createToken = async (
  jwtPayload: { userId: string | undefined; role: string | undefined },
  secret: string,
  expiresIn: string,
) => {
  if (!jwtPayload) {
    return null
  }

  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  })
}
