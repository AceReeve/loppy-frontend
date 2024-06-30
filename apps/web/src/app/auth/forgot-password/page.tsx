import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Checkbox } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import Link from "next/link";
import GoogleSignInButton from "@/src/app/auth/_components/google-sign-in-button";
import FacebookSignInButton from "@/src/app/auth/_components/facebook-sign-in-button";
import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { LoginSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [process, setProcess] = useState(0);
  const [view, setView] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = () => {
    console.log("Submitted");
    setProcess(process + 1);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const RecoverPassword = () => {
    return (
      <>
        <div className="font-open-sans mt-10 text-[15px] lg:mt-0">
          <div className="text-center flex flex-col gap-4">
            <h1 className="font-montserrat  text-2xl font-semibold sm:text-[24px] text-black">
              Recover Your Password
            </h1>
            <p>
              Enter Your Email And We'll Send You Instructions To Reset Your
              Password
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

              <button
                className="btn-gradient-primary col-span-6 font-semibold h-[38px]"
                disabled={isPending}
                type="submit"
              >
                {isPending ? <LoadingSpinner /> : null}
                Send Reset Password
              </button>

              <div className="flex flex-col gap-4 sm:flex-row text-center col-span-6 m-auto">
                <p className="font-nunito text-sm font-semibold text-[14px] ">
                  Go Back To{" "}
                  <Link className="text-primary " href="/auth/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  const ResetPassword = () => {
    return (
      <>
        <div className="font-open-sans mt-10 text-[15px] lg:mt-0">
          <div className="text-center flex flex-col gap-4">
            <h1 className="font-montserrat  text-2xl font-semibold sm:text-[24px] text-black">
              Reset Your Password
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
                <div className="relative">
                  <input
                    className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none h-[38px]"
                    id="password"
                    placeholder="New Password"
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
              </div>

              <div className="col-span-6">
                <div className="relative">
                  <input
                    className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none h-[38px]"
                    id="confirm_password"
                    placeholder="Confirm New Password"
                    type={showPassword ? "text" : "password"}
                    {...register("confirm_password")} // Assuming you're using react-hook-form
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>
              <button
                className="btn-gradient-primary col-span-6 font-semibold h-[38px]"
                disabled={isPending}
                type="submit"
              >
                {isPending ? <LoadingSpinner /> : null}
                Send Reset Password
              </button>

              <div className="flex flex-col gap-4 sm:flex-row text-center col-span-6 m-auto">
                <p className="font-nunito text-sm font-semibold text-[14px] ">
                  Go Back To{" "}
                  <Link className="text-primary " href="/auth/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  const PasswordReset = () => {};

  const views = [
    {
      component: <RecoverPassword />,
    },
    {
      component: <ResetPassword />,
    },
    {
      component: <PasswordReset />,
    },
  ];

  return (
    <>
      <div className="py-5">
        <Image
          alt="icon-lock"
          src="/assets/icons/icon-lock.svg"
          width={138}
          height={141}
          className={"m-auto"}
        />
      </div>
      {views[process].component}
    </>
  );
}
