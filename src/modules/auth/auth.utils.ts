import jwt from 'jsonwebtoken'

export const createToken = async (
  jwtPayload: { userId: string | undefined; role: string | undefined },
  secret: string,
  expiresIn: string,
) => {
  if (!jwtPayload) {
    return null
  }
  console.log(jwtPayload, secret, expiresIn)

  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  })
}
