"use server";

import type { z } from "zod";
import { AuthError } from "next-auth";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoginSchema } from "@/src/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const handleCredentialsSignUp = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  // Throw proper error response from backend server
  if (authResponse.ok) {
    return handleCredentialsSignIn(values, callbackUrl);
  }
  const res = await authResponse.json();
  if (res.errors) {
    if (Array.isArray(res.errors)) {
      if (typeof res.errors[0] === "object") {
        throw new Error(Object.values(res.errors[0])[0] as any);
      }
      throw new Error(res.errors[0]);
    }
    throw new Error(res.errors);
  } else {
    throw new Error(authResponse.statusText);
  }
};

export const handleCredentialsSignIn = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return {
            error:
              // TODO: Request error codes to BE to avoid this return error structure
              error.cause?.err?.message === "fetch failed"
                ? getErrorMessage("fetch failed")
                : error.cause?.err?.message,
          };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const handleOAuthSignin = async (provider: "google" | "facebook") => {
  try {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // console.log("HEYYYYYYYYYY");
    }

    throw error;
  }
};

export const saveGoogleInfo = async (payload: {
  email: string;
  first_name: string;
  last_name: string;
  picture: string;
}) => {
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

  // Throw proper error response from backend server
  if (response.ok) {
    return;
  }
  // const res = await authResponse.json();
  // if (res.errors) {
  //   if (Array.isArray(res.errors)) {
  //     if (typeof res.errors[0] === "object") {
  //       throw new Error(Object.values(res.errors[0])[0] as any);
  //     }
  //     throw new Error(res.errors[0]);
  //   }
  //   throw new Error(res.errors);
  // } else {
  //   throw new Error(authResponse.statusText);
  // }
};
