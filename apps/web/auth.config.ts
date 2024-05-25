import type { NextAuthConfig } from "next-auth";
import Google from "@auth/core/providers/google";
import Facebook from "@auth/core/providers/facebook";
import Credentials from "@auth/core/providers/credentials";
import { LoginSchema } from "@/src/schemas";

export const authConfig = {
  providers: [
    Google({
      authorization: {
        /**
         * Tell the provider that we want a prompt for consent of the user everytime,
         * and we want the offline mode of authentication. This will make sure that we get a refresh_token.
         */
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const authResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            },
          );

          // Throw proper error response from backend server
          if (authResponse.ok) {
            return authResponse.json();
          }
          const res = await authResponse.json();
          if (res.errors) {
            throw new Error(res.errors);
          } else {
            throw new Error(authResponse.statusText);
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
