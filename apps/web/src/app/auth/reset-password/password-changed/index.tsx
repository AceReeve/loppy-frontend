import React from "react";
export default function PasswordChanged() {
  return (
    <div className="font-open-sans mt-10 text-[15px] lg:mt-0 py-4">
      <div className="text-center flex flex-col gap-4">
        <h1 className="font-montserrat  text-2xl font-semibold sm:text-[24px] text-black">
          Password Changed!
        </h1>
        <p>Your password has been reset successfully</p>

        <div className={"m-auto w-full h-[38px] content-center flex"}>
          <a
            href="/auth/login"
            className=" m-auto bg-primary text-white hover:bg-primary-light h-[38px] w-full p-2"
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
}
