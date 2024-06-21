"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { LoginSchema } from "@/src/schemas";
import { handleCredentialsSignIn } from "@/src/actions/login-actions";
import GoogleSignInButton from "../_components/google-sign-in-button";
import FacebookSignInButton from "../_components/facebook-sign-in-button";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      handleCredentialsSignIn(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch((e) => {
          setError(e.message || e.statusText);
        });
    });
  };

  useEffect(() => {
    if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, [errorParam]);

  return (
    <div className="font-open-sans mt-10 text-[15px] lg:mt-0">
      <div className="text-left">
        <h1 className="font-montserrat text-primary text-2xl font-bold sm:text-[32px]">
          Login
        </h1>

        <p className="mt-2 text-[13px] font-normal text-gray-500">
          Enter your credential to access your account.
        </p>
      </div>

      <div className="mt-5 lg:mt-12">
        {error ? (
          <div
            className="mb-5 rounded border-s-4 border-red-500 bg-red-50 p-4"
            role="alert"
          >
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : null}

        <form
          className="font-nunito grid grid-cols-6 gap-6 text-black"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-6">
            <label className="block text-sm font-bold" htmlFor="Email">
              Email
            </label>

            <input
              className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none"
              id="Email"
              type="email"
              {...register("email")}
            />

            {errors.email ? (
              <p className="text-error mt-2 text-[0.8rem] font-medium">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-bold" htmlFor="Password">
              {" "}
              Password{" "}
            </label>

            <input
              className="mt-1 w-full border-[#D0D3DB] font-bold shadow-none"
              id="Password"
              type="password"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-error mt-2 text-[0.8rem] font-medium">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <button
            className="btn-gradient-primary col-span-6"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <LoadingSpinner /> : null}
            Sign In
          </button>
        </form>

        <div className="font-nunito mt-6 grid grid-cols-6 gap-6 text-black">
          <div className="col-span-6">
            <div className="flex items-center justify-center gap-8">
              <div className="h-[1px] flex-auto bg-gray-300" />
              <span className="text-gray-400">or</span>
              <div className="h-[1px] flex-auto bg-gray-300" />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <GoogleSignInButton />
              <FacebookSignInButton />
            </div>
          </div>

          <div className="col-span-6 mt-3 sm:flex sm:items-center sm:gap-4">
            <p className="font-nunito text-sm font-bold">
              No account yet?{" "}
              <Link className="text-primary underline" href="/auth/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
