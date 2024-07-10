"use client";
import { toast } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSendResetPasswordMutation } from "@repo/redux-utils/src/endpoints/forgot-password.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { SendPasswordVerification } from "@/src/schemas";

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof SendPasswordVerification>>({
    resolver: zodResolver(SendPasswordVerification),
    defaultValues: {
      email: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [error, setError] = useState("");
  const [process, setProcess] = useState(0);

  const nextProcess = () => {
    setProcess(process + 1);
  };

  const [sendRequest, { isLoading }] = useSendResetPasswordMutation();
  const onSubmit = async () => {
    await sendRequest(form.getValues())
      .unwrap()
      .then(() => {
        nextProcess();
      })
      .catch((e: unknown) => {
        setError("Failed to Submit");
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const handleResendCode = () => {
    sendRequest(form.getValues())
      .then()
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const emailVerified = () => {
    return (
      <div className="mt-10 py-4 font-open-sans text-[15px] lg:mt-0">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-montserrat  text-2xl font-semibold text-black sm:text-[24px]">
            Verification
          </h1>
          <p>We have sent a verification to your email address.</p>

          <div>
            <p className=" font-nunito text-[14px] text-gray-500">
              Didn&apos;t receive OTP code?{" "}
              <Link
                className="font-nunito text-[14px] text-primary underline"
                href="/auth/forgot-password"
                onClick={handleResendCode}
              >
                Resend Code
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const emailVerification = () => {
    return (
      <div className="mt-10 font-open-sans text-[15px] lg:mt-0">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-montserrat  text-2xl font-semibold text-black sm:text-[24px]">
            Recover Your Password
          </h1>
          <p>
            Enter Your Email And We&apos;ll Send You Instructions To Reset Your
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
            className="grid grid-cols-6 gap-6 font-nunito text-black"
            //onSubmit={form.handleSubmit(onSubmit)}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="col-span-6">
              {/*            <label className="block text-sm font-bold" htmlFor="Email">
              Email
            </label>*/}

              <input
                className="mt-1 h-[38px] w-full border-[#D0D3DB] font-medium shadow-none"
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

            <button
              className="btn-gradient-primary col-span-6 h-[38px] font-semibold"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <LoadingSpinner /> : null}
              {isLoading ? "Sending Request" : "Send Reset Password"}
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

  const views = [
    {
      view: emailVerification(),
    },
    {
      view: emailVerified(),
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
      {views[process].view}
    </>
  );
}
