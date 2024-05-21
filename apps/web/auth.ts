import NextAuth from "next-auth";
import { signJwt } from "@repo/hooks-and-utils/jwt-utils";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async authorized({ auth }) {
      return Boolean(auth);
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        if (account.provider === "google") {
          const jwt = await signJwt({
            sub: token.sub,
            id_token: account.id_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            email: user.email,
            image: user.image,
          });

          console.log("jwt", jwt);
          console.log("user", user);
          console.log("sub", token.sub);
          console.log("id_token", account.id_token);
          console.log("access_token", account.access_token);
          console.log("expires_at", account.expires_at);

          // TODO: Implement BE signin here
          return {
            ...token,
            jwt,
          };
        } else if (account.provider === "credentials") {
          return { ...token, jwt: user.access_token };
        }
      }
      return token;
    },
    async session({ session, token }) {
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
