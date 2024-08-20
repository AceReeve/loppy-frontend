/* eslint-disable -- will do later after merge */
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  ConfirmOTPSchema,
  RegisterSchema,
  SendRegisterOTPSchema,
} from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  handleConfirmOTP,
  handleCredentialsSignUp,
  handleSendOTP,
} from "@/src/actions/login-actions.ts";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/ui";
import Link from "next/link";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

type RegisterOTPProps = {
  data: z.infer<typeof RegisterSchema>;
  handleOpenDetails: (isOpen: boolean) => void;
};
export default function RegisterOTP(props: RegisterOTPProps) {
  const confirmOTPForm = useForm<z.infer<typeof ConfirmOTPSchema>>({
    resolver: zodResolver(ConfirmOTPSchema),
    defaultValues: {
      email: props.data.email,
      otp: "",
    },
  });

  const { register, formState } = confirmOTPForm;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    const OTPForm: z.infer<typeof SendRegisterOTPSchema> = {
      email: props.data.email,
    };

    startTransition(() => {
      //setProcess(1);
      // setProcess(1);
      //handleCredentialsSignUp
      handleSendOTP(OTPForm)
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
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const token = searchParams.get("token");
  const SubmitOTPConfirmation = (values: z.infer<typeof ConfirmOTPSchema>) => {
    setError("");
    setSuccess("");

    const otpSchema: z.infer<typeof ConfirmOTPSchema> =
      confirmOTPForm.getValues();

    startTransition(() => {
      //handleCredentialsSignIn(values, callbackUrl);
      console.log("Confirm Called Inside Transition");
      handleConfirmOTP(otpSchema)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            //props.handleOpenDetails(true);
            startTransition(() => {
              handleCredentialsSignUp(props.data, callbackUrl, token)
                .then((data) => {
                  if (data?.error) {
                    setError(data.error);
                  }
                })
                .catch((e) => {
                  setError(e.message || e.statusText);
                });
            });
          }
        })
        .catch((e) => {
          setError(e.message || e.statusText);
        });
    });
  };

  /*

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  */

  const handleResendCode = async () => {
    try {
      onSubmit(props.data);
      console.log("Code Sent");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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

        <Form {...confirmOTPForm}>
          <form
            className="w-full font-nunito text-black"
            onSubmit={confirmOTPForm.handleSubmit(SubmitOTPConfirmation)}
          >
            <div className="mb-10 block h-auto text-center">
              <p className="text-[40px] font-bold">OTP Verification</p>
              <p className={" text-[16px] font-normal text-gray-500"}>
                Enter OTP Code sent to Email
              </p>
              <FormField
                control={confirmOTPForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="mx-auto my-5 flex h-[100px] w-full grid-cols-6 content-center justify-evenly gap-5">
                          <InputOTPSlot
                            index={0}
                            className="h-full w-full border-2 bg-gray-100  font-nunito text-[44px]"
                          />
                          <InputOTPSlot
                            index={1}
                            className="h-full w-full border-2 bg-gray-100 font-nunito text-[44px]"
                          />{" "}
                          <InputOTPSlot
                            index={2}
                            className="h-full w-full border-2  bg-gray-100 font-nunito text-[44px]"
                          />
                          <InputOTPSlot
                            index={3}
                            className="h-full w-full border-2  bg-gray-100 font-nunito text-[44px]"
                          />
                          <InputOTPSlot
                            index={4}
                            className="h-full  w-full border-2 bg-gray-100 font-nunito text-[44px]"
                          />
                          <InputOTPSlot
                            index={5}
                            className="h-full w-full border-2 bg-gray-100 font-nunito text-[44px]"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              {errors.email ? (
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.email.message}
                </p>
              ) : null}
              {errors.otp ? (
                <p className="mt-2 text-[0.8rem] font-medium text-error">
                  {errors.otp.message}
                </p>
              ) : null}
              <p className={" text-[16px] font-bold text-gray-500"}>
                Didn't receive OTP code?
              </p>
              <Link
                className="text-[16px] text-primary underline"
                href="/auth/register"
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
        </Form>
      </div>
    </div>
  );
}
