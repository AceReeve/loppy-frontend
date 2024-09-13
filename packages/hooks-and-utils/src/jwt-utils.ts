import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { getErrorMessage } from "./error-utils.ts";

export function getJwtSecretKey() {
  const secret = process.env.APP_JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  return new TextEncoder().encode(secret);
}

export const signJwt = async (payload: JWTPayload, expiresIn = "1d") => {
  try {
    return new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setExpirationTime(expiresIn)
      .sign(getJwtSecretKey());
  } catch (e) {
    // eslint-disable-next-line no-console -- for debug
    console.log("JWT ERROR!", e);
    throw new Error(getErrorMessage(e));
  }
};

export const verifyJwt = async (token: string) => {
  return await jwtVerify(token, getJwtSecretKey());
};
