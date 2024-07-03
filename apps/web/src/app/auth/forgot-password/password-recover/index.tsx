import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema, SendPasswordVerification } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useSendResetPasswordMutation } from "@repo/redux-utils/src/endpoints/forgot-password.ts";
import { handleSendOTP } from "@/src/actions/login-actions.ts";
type Props = {
  nextProcess: () => void;
};

export default function RecoverPassword(props: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof SendPasswordVerification>>({
    resolver: zodResolver(SendPasswordVerification),
    defaultValues: {
      email: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;
  const [error, setError] = useState("");

  const [sendRequest, { isLoading }] = useSendResetPasswordMutation();

  const onSubmit = async () => {
    await sendRequest(form.getValues())
      .then((response) => {
        props.nextProcess();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResendCode = async () => {
    try {
      onSubmit();
      console.log("Code Sent");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
            //onSubmit={form.handleSubmit(onSubmit)}
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
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? <LoadingSpinner /> : null}
              {isLoading ? "Sending Request" : "Send Reset Password"}
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
}
