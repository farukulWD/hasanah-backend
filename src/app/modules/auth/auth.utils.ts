import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string, emailOrMobile: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, <jwt.SignOptions>{
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};