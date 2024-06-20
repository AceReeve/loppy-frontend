import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp.tsx";
import Link from "next/link";
import LoadingSpinner from "@/src/loading/loading-spinner.tsx";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { ConfirmOTPSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmOTPForm = useForm<z.infer<typeof ConfirmOTPSchema>>({
  resolver: zodResolver(ConfirmOTPSchema),
  defaultValues: {
    email: form.getValues("email"),
    otp: "",
  },
});
export default function RegisterOTP() {
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
  );
}
