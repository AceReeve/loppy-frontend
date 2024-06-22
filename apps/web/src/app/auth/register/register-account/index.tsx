import GoogleSignInButton from "@/src/app/auth/_components/google-sign-in-button";
import FacebookSignInButton from "@/src/app/auth/_components/facebook-sign-in-button";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { RegisterSchema, SendRegisterOTPSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSendOTP } from "@/src/actions/login-actions.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

export default function Registration({
  HandleStepProcess,
}: {
  HandleStepProcess: (
    step: number,
    form: z.infer<typeof RegisterSchema>,
  ) => void;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    const OTPForm: z.infer<typeof SendRegisterOTPSchema> = {
      email: form.getValues("email"),
    };

    startTransition(() => {
      //setProcess(1);
      // setProcess(1);
      //handleCredentialsSignUp
      handleSendOTP(OTPForm, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            HandleStepProcess(1, form.getValues()); //UNCOMMENT THIS TO MAKE IT PROCEED TO NEXT STEP
            // setOpenDetails(true);
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

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <>
      <div className="mt-10 font-open-sans text-[15px] lg:mt-0">
        <div className="text-left">
          <h1 className="font-montserrat text-2xl font-bold text-primary sm:text-[32px]">
            Get Started Now
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
            className="grid grid-cols-6 gap-6 font-nunito text-black"
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
                <p className="mt-2 text-[0.8rem] font-medium text-error">
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
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="col-span-6">
              <label className="block text-sm font-bold" htmlFor="Password">
                {" "}
                Confirm Password{" "}
              </label>

              <input
                className="mt-1 w-full border-[#D0D3DB] font-bold shadow-none"
                id="confirmPassword"
                type="password"
                {...register("confirm_password")}
              />
              {errors.confirm_password ? (
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.confirm_password.message}
                </p>
              ) : null}
            </div>

            <button
              className="btn-gradient-primary col-span-6"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <LoadingSpinner /> : null}
              Sign Up
            </button>
          </form>

          <div className="mt-6 grid grid-cols-6 gap-6 font-nunito text-black">
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

            <div className="col-span-6 font-nunito font-bold">
              <p className="text-sm">
                By singing up, you agree to our{" "}
                <a className="text-primary underline" href="#">
                  Terms of Services
                </a>{" "}
                and{" "}
                <a className="text-primary underline" href="#">
                  Privacy policy
                </a>
              </p>
            </div>

            <div className="col-span-6 mt-3 sm:flex sm:items-center sm:gap-4">
              <p className="font-nunito text-sm font-bold">
                Have an account?{" "}
                <Link className="text-primary underline" href="/auth/login">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
