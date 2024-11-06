/* eslint-disable no-console -- (temporary) need for debugging */
import NextAuth, { type Profile } from "next-auth";
import { signJwt } from "@repo/hooks-and-utils/jwt-utils";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth: mAuth }) {
      return Boolean(mAuth);
    },
    async jwt({ token, account, user, profile }) {
      if (account) {
        if (account.provider === "google" && profile) {
          console.log("====START====");

          console.log("profile", profile);
          console.log("user", user);

          console.log("sub", token.sub);
          console.log("id_token", account.id_token);
          console.log("access_token", account.access_token);
          console.log("expires_at", account.expires_at);
          console.log("email", user.email);
          console.log("image", user.image);

          const jwt = await signJwt({
            sub: token.sub,
            id_token: account.id_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            email: user.email,
            image: user.image,
          });
          console.log("jwt", jwt);

          const res = await saveGoogleInfo({
            email: profile.email ?? "",
            first_name: profile.given_name ?? "",
            last_name: profile.family_name ?? "",
            picture: profile.picture as string,
            token: jwt,
          });

          console.log("profile.email", profile.email);
          console.log("profile.given_name", profile.given_name);
          console.log("profile.family_name", profile.family_name);
          console.log("profile.picture", profile.picture);
          console.log("res access token", res.access_token);
          console.log("====END====");

          return {
            ...token,
            jwt: res.access_token,
            role: res.userData.role.role_name,
            id: res.userData._id,
            profile,
          };
        } else if (account.provider === "credentials") {
          return {
            ...token,
            jwt: user.access_token,
            role: user.role.role_name,
            id: user._id,
            profile: {
              given_name: user.email?.split("@")[0] ?? "",
            },
          };
        }
      }
      return token;
    },
    session({ session, token }) {
      session.jwt = token.jwt as string;
      session.profile = token.profile as Profile;
      session.user.name = token.email?.split("@")[0] ?? "";
      session.role = token.role as string;
      session.user.id = token.id as string;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.JWT_EXPIRATION ?? "3000"),
  },
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

interface ResponseType {
  access_token: string;
  userData: {
    role: {
      role_name: string;
    };
    _id: string;
  };
}

async function saveGoogleInfo(payload: {
  email: string;
  first_name: string;
  last_name: string;
  picture: string;
  token: string;
}): Promise<ResponseType> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/google-save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (response.ok) {
    const r = (await response.json()) as Promise<ResponseType>;
    console.log("Return!!", r);
    return r;
  }

  // Throw proper error response from backend server
  const res: unknown = await response.json();
  console.log("ERROR GOOGLE SAVE!", res);

  throw new Error(getErrorMessage(res));
}
