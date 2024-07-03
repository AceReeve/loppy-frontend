"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

import Link from "next/link";
import { useSetNewPasswordMutation } from "@repo/redux-utils/src/endpoints/forgot-password.ts";
import { toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { SetNewPasswordSchema } from "@/src/schemas";
export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof SetNewPasswordSchema>>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      token: "",
    },
  });
  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

  const { register, formState } = form;
  const { errors } = formState;

  const [error, setError] = useState("");
  const [process, setProcess] = useState(0);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const onSubmit = async () => {
    form.setValue("token", token ?? "");
    await setNewPassword(form.getValues())
      .then(() => {
        nextProcess();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };
  const nextProcess = () => {
    setProcess(process + 1);
  };

  const changePassword = () => {
    return (
      <div className="mt-10 font-open-sans text-[15px] lg:mt-0">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-montserrat  text-2xl font-semibold text-black sm:text-[24px]">
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
            className="grid grid-cols-6 gap-6 font-nunito text-black"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="col-span-6">
              <div className="relative">
                <input
                  className="mt-1 h-[38px] w-full border-[#D0D3DB] font-medium shadow-none"
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
                {errors.password ? (
                  <p className="mt-2 text-[0.8rem] font-medium text-error">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="col-span-6">
              <div className="relative">
                <input
                  className="mt-1 h-[38px] w-full border-[#D0D3DB] font-medium shadow-none"
                  id="confirm_password"
                  placeholder="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password")} // Assuming you're using react-hook-form
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
                {errors.confirm_password ? (
                  <p className="mt-2 text-[0.8rem] font-medium text-error">
                    {errors.confirm_password.message}
                  </p>
                ) : null}
              </div>
            </div>
            <button
              className="btn-gradient-primary col-span-6 h-[38px] font-semibold"
              disabled={isLoading}
              type="submit"
            >
              {/*{isLoading ? <LoadingSpinner /> : null}*/}
              Send Reset Password
            </button>

            <div className="col-span-6 m-auto flex flex-col gap-4 text-center sm:flex-row">
              <p className="font-nunito text-[14px] text-sm font-semibold ">
                Go Back To{" "}
                <Link className="text-primary " href="/auth/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const resetVerified = () => {
    return (
      <div className="mt-10 py-4 font-open-sans text-[15px] lg:mt-0">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-montserrat  text-2xl font-semibold text-black sm:text-[24px]">
            Password Changed!
          </h1>
          <p>Your password has been reset successfully</p>

          <div className={"m-auto flex h-[38px] w-full content-center"}>
            <a
              href="/auth/login"
              className=" m-auto h-[38px] w-full bg-primary p-2 text-white hover:bg-primary-light"
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    );
  };

  const views = [
    {
      component: changePassword(),
    },
    {
      component: resetVerified(),
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
          className="m-auto"
        />
      </div>
      {views[process].component}
    </>
  );
}
