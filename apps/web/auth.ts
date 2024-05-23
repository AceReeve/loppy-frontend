import NextAuth from "next-auth";
import { signJwt } from "@repo/hooks-and-utils/jwt-utils";
import { authConfig } from "@/auth.config";
import { saveGoogleInfo } from "@/src/actions/login-actions.ts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && profile) {
        if (account.provider === "google") {
          // const jwt = await signJwt({
          //   sub: token.sub,
          //   id_token: account.id_token,
          //   access_token: account.access_token,
          //   expires_at: account.expires_at,
          //   email: user.email,
          //   image: user.image,
          // });

          // console.log("token", token);
          // console.log("jwt", jwt);
          // console.log("user", user);
          // console.log("profile", profile);
          // console.log("sub", token.sub);
          // console.log("id_token", account.id_token);
          // console.log("access_token", account.access_token);
          // console.log("expires_at", account.expires_at);

          const res = await saveGoogleInfo({
            email: profile.email,
            first_name: profile.given_name,
            last_name: profile.family_name,
            picture: profile.picture,
          });
          console.log("res", res);

          // TODO: Implement BE signin here
          return {
            ...token,
            jwt: res.access_token,
          };
        } else if (account.provider === "credentials") {
          return { ...token, jwt: user.access_token };
        }
      }
      return token;
    },
    session({ session, token }) {
      session.jwt = token.jwt as string;
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: parseInt(process.env.JWT_EXPIRATION) },
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.COOKIE_SECURE === "true",
        domain: process.env.COOKIE_DOMAIN,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.COOKIE_SECURE === "true",
        domain: process.env.COOKIE_DOMAIN,
      },
    },
  },
  trustHost: true,
  // basePath: "/api/auth",
  ...authConfig,
});
