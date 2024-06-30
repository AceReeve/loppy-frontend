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
import { Checkbox } from "@repo/ui/components/ui";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import ForgotPassword from "@/src/app/auth/forgot-password/page.tsx";

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
  const views = [
    {
      page: Login,
    },
    {
      page: ForgotPassword,
    },
  ];

  const [view, setView] = useState(false);

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
          setError(getErrorMessage(e));
        });
    });
  };

  useEffect(() => {
    if (errorParam) {
      setError(getErrorMessage(errorParam));
    }
  }, [errorParam]);

  const LoginView = () => {
    return (
      <div className="font-open-sans mt-10 text-[15px] lg:mt-0">
        <div className="text-center">
          <h1 className="font-montserrat  text-2xl font-semibold sm:text-[24px] text-black">
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
            className="font-nunito grid grid-cols-6 gap-6 text-black"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="col-span-6">
              {/*            <label className="block text-sm font-bold" htmlFor="Email">
              Email
            </label>*/}

              <input
                className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none h-[38px]"
                id="Email"
                type="email"
                placeholder={"Email"}
                {...register("email")}
              />

              {errors.email ? (
                <p className="text-error mt-2 text-[0.8rem] font-medium">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            {/*  <div className="col-span-6">

            <label className="block text-sm font-bold" htmlFor="Password">
              {" "}
              Password{" "}
            </label>


            <input
              className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none h-[38px]"
              id="Password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-error mt-2 text-[0.8rem] font-medium">
                {errors.password.message}
              </p>
            ) : null}
          </div>*/}

            <div className="col-span-6">
              <div className="relative">
                <input
                  className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none h-[38px]"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")} // Assuming you're using react-hook-form
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
              {/* Uncomment this block if you want to display error messages */}
              {/* {errors.password && (
        <p className="mt-2 text-[0.8rem] font-medium text-error">
          {errors.password.message}
        </p>
      )} */}
            </div>

            <div className="col-span-6 flex gap-3">
              <Checkbox
                id="rememberMe"
                className={"size-5 content-center rounded-full"}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button
              className="btn-gradient-primary col-span-6 font-semibold h-[38px]"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <LoadingSpinner /> : null}
              Login
            </button>

            <div className="flex flex-col gap-4 sm:flex-row text-center col-span-6">
              <Link
                className={"text-[14px] font-semibold m-auto text-center"}
                href="/auth/forgot-password"
              >
                Forgot Your Password?
              </Link>
            </div>
          </form>

          <div className="font-nunito mt-6 grid grid-cols-6 gap-6 text-black">
            <div className="col-span-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <GoogleSignInButton />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <FacebookSignInButton />
              </div>
            </div>

            <div className="col-span-6 mt-3 sm:flex sm:items-center sm:gap-4 m-auto">
              <p className="font-nunito text-sm font-semibold text-[14px]">
                Don't Have an Account?{" "}
                <Link className="text-primary" href="/auth/register">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return ForgotPassword();
}
