"use client";
import { Checkbox } from "@repo/ui/components/ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { isRedirectError } from "next/dist/client/components/redirect";
import { handleCredentialsSignIn } from "@/src/actions/login-actions";
import { LoginSchema } from "@/src/schemas";
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");

    startTransition(() => {
      handleCredentialsSignIn(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch((e: unknown) => {
          if (!isRedirectError(e)) {
            setError(getErrorMessage(e));
          }
        });
    });
  };

  useEffect(() => {
    if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, [errorParam]);

  return (
    <div className="mt-10 font-open-sans text-[15px] lg:mt-0">
      <div className="text-center">
        <h1 className="font-montserrat text-2xl font-semibold text-black sm:text-[24px]">
          Login to your Account
        </h1>
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
          className="grid grid-cols-6 gap-6 font-nunito text-black"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-6 flex flex-col gap-2">
            <div>
              <input
                className="mt-1 h-[38px] w-full border-[#D0D3DB] text-sm font-medium shadow-none"
                id="Email"
                type="email"
                placeholder="Email"
                {...register("email")}
              />

              {errors.email ? (
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <div className="relative">
                <input
                  className="mt-1 h-[38px] w-full border-[#D0D3DB] text-sm font-medium shadow-none"
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")} // Assuming you're using react-hook-form
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 mt-1 flex max-h-[38px] items-center px-2"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {/* Uncomment this block if you want to display error messages */}
              {errors.password ? (
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="col-span-6 flex gap-3">
            <Checkbox
              id="rememberMe"
              className="size-5 content-center rounded-full text-sm"
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className="col-span-6 flex flex-col gap-2">
            <button
              className="btn-gradient-primary h-[38px] font-semibold"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <LoadingSpinner /> : null}
              Login
            </button>

            <Link
              className="m-auto text-center text-[14px] font-semibold"
              href="/auth/forgot-password"
            >
              Forgot Your Password?
            </Link>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-6 gap-6 font-nunito text-black">
          <div className="col-span-6 flex flex-col gap-2">
            <GoogleSignInButton />
            <FacebookSignInButton />
          </div>

          <div className="col-span-6 m-auto mt-3 sm:flex sm:items-center sm:gap-4">
            <p className="font-nunito text-[14px] text-sm font-semibold">
              Don&apos;t Have an Account?{" "}
              <Link className="text-primary" href="/auth/register">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
