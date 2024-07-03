import React from "react";
import Link from "next/link";
export default function PasswordVerification() {
  return (
    <div className="font-open-sans mt-10 text-[15px] lg:mt-0 py-4">
      <div className="text-center flex flex-col gap-4">
        <h1 className="font-montserrat  text-2xl font-semibold sm:text-[24px] text-black">
          Verification
        </h1>
        <p>We have sent a verification to your email address.</p>

        <div>
          <p className={" text-[14px] font-nunito text-gray-500"}>
            Didn't receive OTP code?{" "}
            <Link
              className="text-primary underline font-nunito text-[14px]"
              href="/auth/forgot-password"
              /*onClick={handleResendCode}*/
            >
              Resend Code
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
