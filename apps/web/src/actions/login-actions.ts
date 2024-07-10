"use server";

import type { z } from "zod";
import { AuthError } from "next-auth";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import {
  ConfirmOTPSchema,
  LoginSchema,
  RegisterDetailsSchema,
  RegisterSchema,
  SendRegisterOTPSchema,
} from "@/src/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const handleRegisterDetails = async (
  values: z.infer<typeof RegisterDetailsSchema>,
) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const validateFields = RegisterDetailsSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Failed to Register details" };
  }

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/user-info`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (authResponse.ok) {
    //await handleCredentialsSignUp(values, callbackURL);
    return;
  }

  // Throw proper error response from backend server
  const res: unknown = await authResponse.json();
  throw new Error(getErrorMessage({ data: res }));
};

export const handleConfirmOTP = async (
  values: z.infer<typeof ConfirmOTPSchema>,
) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const validateFields = ConfirmOTPSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Wrong OTP " };
  }
  const { email, otp } = validateFields.data;

  const queryParams = new URLSearchParams({ email, otp }).toString();

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify-otp?${queryParams}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (authResponse.ok) {
    //await handleCredentialsSignUp(values, callbackURL);
    return;
  }

  // Throw proper error response from backend server
  const res: unknown = await authResponse.json();
  throw new Error(getErrorMessage(res));
};
export const handleSendOTP = async (
  values: z.infer<typeof SendRegisterOTPSchema>,
) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const validateFields = SendRegisterOTPSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Failed to send OTP" };
  }

  const { email } = validateFields.data;
  const queryParams = new URLSearchParams({ email }).toString();

  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/send-register-otp?${queryParams}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (authResponse.ok) {
    return;
  }

  // Throw proper error response from backend server
  const res: unknown = await authResponse.json();

  // Add data to properly get error message (we optimize getErrorMessage soon so that we don't need to do this)
  throw new Error(getErrorMessage({ data: res }));
};

export const handleCredentialsSignUp = async (
  values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null,
) => {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const validatedFields = RegisterSchema.safeParse(values);

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
    //return;
  }
  // Throw proper error response from backend server
  const res: unknown = await authResponse.json();
  throw new Error(getErrorMessage({ data: res }));
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
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
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
