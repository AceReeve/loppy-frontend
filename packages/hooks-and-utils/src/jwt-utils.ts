import { jwtVerify, SignJWT } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.APP_JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  return new TextEncoder().encode(secret);
}

export const signJwt = async (payload: any, expiresIn = "1d") => {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(expiresIn)
    .sign(getJwtSecretKey());
};

export const verifyJwt = async (token: string) => {
  return await jwtVerify(token, getJwtSecretKey());
};
