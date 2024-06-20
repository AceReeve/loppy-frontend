"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import LoadingSpinner from "@repo/ui/loading-spinner.tsx";
import {
  ConfirmOTPSchema,
  RegisterSchema,
  SendRegisterOTPSchema,
} from "@/src/schemas";
import {
  handleConfirmOTP,
  handleCredentialsSignIn,
  handleSendOTP,
} from "@/src/actions/login-actions";
import FacebookSignInButton from "../_components/facebook-sign-in-button";
import GoogleSignInButton from "../_components/google-sign-in-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp.tsx";
import Registration from "@/src/app/dashboard/_components/registration";
export default function Register() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const confirmOTPForm = useForm<z.infer<typeof ConfirmOTPSchema>>({
    resolver: zodResolver(ConfirmOTPSchema),
    defaultValues: {
      email: form.getValues("email"),
      otp: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [process, setProcess] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);

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
            setProcess(1);
            // setOpenDetails(true);
          }
        })
        .catch((e) => {
          setError(e.message || e.statusText);
        });
    });
  };

  const handleResendCode = async () => {
    try {
      await onSubmit(form.getValues());
      // Optionally handle success or redirect after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle and display the error to the user
    }
  };
  const onHandleProceed = () => {
    //setOpenDetails(false);
    //setProcess(step);

    handleCredentialsSignIn(form.getValues(), callbackUrl)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setProcess(1);
          // setOpenDetails(true);
        }
      })
      .catch((e) => {
        setError(e.message || e.statusText);
      });
  };
  const onConfirmOTP = (values: z.infer<typeof ConfirmOTPSchema>) => {
    setError("");
    setSuccess("");
    console.log("Confirm Called");

    const confirmOPTForm: z.infer<typeof ConfirmOTPSchema> =
      confirmOTPForm.getValues();
    startTransition(() => {
      //handleCredentialsSignIn(values, callbackUrl);
      console.log("Confirm Called Inside Transition");
      handleConfirmOTP(confirmOPTForm, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            //setProcess(1);
            // setOpenDetails(true);
            setOpenDetails(true);
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

  const registration = () => (
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

  const registerDetails = () => <>REGISTER DETAILS</>;
  const otpRequest = () => (
    <>
      <div className="mt-16 font-open-sans text-[15px] lg:mt-0">
        <div className="text-left">
          <h1 className="font-montserrat text-2xl font-bold text-primary sm:text-[42px]">
            Service Hero
          </h1>

          <p className="mt-2 text-[13px] font-normal text-gray-500">
            Welcome to Service Hero
          </p>
        </div>

        <div className="mt-5 lg:mt-12 ">
          {error ? (
            <div
              className="mb-5 rounded border-s-4 border-red-500 bg-red-50 p-4"
              role="alert"
            >
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : null}

          <form
            className="w-full font-nunito text-black"
            onSubmit={confirmOTPForm.handleSubmit(onConfirmOTP)}
          >
            <div className="block h-auto text-center mb-10">
              <p className="text-[40px] font-bold">OTP Verification</p>
              <p className={" text-[16px] font-normal text-gray-500"}>
                Enter OTP Code sent to Email
              </p>
              {/*              <FormField control = {form.control}
                         name = {"OTP"}
                         render = {({field}) => (
                             <FormItem>
                               <FormControl>

                               </FormControl>
                             </FormItem>
                         )}/>
              */}
              <InputOTP maxLength={6}>
                <InputOTPGroup className="my-5 justify-evenly flex w-[500px] mx-auto">
                  <InputOTPSlot
                    index={0}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />
                  <InputOTPSlot
                    index={1}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />{" "}
                  <InputOTPSlot
                    index={2}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />
                  <InputOTPSlot
                    index={3}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />
                  <InputOTPSlot
                    index={4}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />
                  <InputOTPSlot
                    index={5}
                    className="border-2 h-[120px] w-[80px] font-nunito text-[48px] bg-gray-100"
                  />
                </InputOTPGroup>
              </InputOTP>
              <p className={" text-[16px] font-bold text-gray-500"}>
                Didn't receive OTP code?
              </p>
              <Link
                className="text-primary underline text-[16px]"
                href={"http://localhost:3000/auth/register"}
                onClick={handleResendCode}
              >
                Resend Code
              </Link>
            </div>

            <button
              className="btn-gradient-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <LoadingSpinner /> : null}
              Verify & Proceed
            </button>
          </form>
        </div>
      </div>
    </>
  );
  const pages = [
    {
      page: registration(),
    },
    {
      page: otpRequest(),
    },
    {
      page: registerDetails(),
    },
  ];
  return (
    <>
      {pages[process].page}
      {openDetails ? (
        <div className="absolute left-0 top-0 z-10 flex size-full">
          <div className="absolute left-0 top-0 size-full bg-black bg-opacity-40 backdrop-blur-md" />
          <div className="relative m-auto flex h-auto w-full max-w-[1283px] flex-col rounded-[29px] border border-neutral-300 bg-gradient-to-b from-indigo-950 to-purple-950">
            <Registration onHandleProceed={onHandleProceed} />
          </div>
        </div>
      ) : null}
    </>
  );
}
