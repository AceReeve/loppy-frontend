"use client";
import { useEffect, useState, useTransition } from "react";

import RegisterDetails from "./register-details";
import Registration from "./register-account";
import { RegisterSchema } from "@/src/schemas";
import { z } from "zod";
import RegisterOTP from "@/src/app/auth/register/register-otp";
export default function Register() {
  const [process, setProcess] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof RegisterSchema>>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const HandleOpenDetails = (isOpen: boolean) => {
    setOpenDetails(true);
  };
  const HandleStepProcess = (
    step: number,
    form: z.infer<typeof RegisterSchema>,
  ) => {
    setProcess(step);
    setFormData(form);
  };

  const HandleDetailsVisibility = (isVisible: boolean) => {
    setOpenDetails(isVisible);
  };

  const otpRequest = () => {
    return (
      <>
        <div className="w-full bg-red-900">OTP Request</div>
      </>
    );
  };

  const pages = [
    {
      page: <Registration HandleStepProcess={HandleStepProcess} />,
    },
    {
      page: (
        <RegisterOTP data={formData} handleOpenDetails={HandleOpenDetails} />
      ),
    },
  ];
  return (
    <>
      {pages[process].page}
      {openDetails ? (
        <div className="absolute left-0 top-0 z-10 flex size-full">
          <div className="absolute left-0 top-0 size-full bg-black bg-opacity-40 backdrop-blur-md" />
          <div className="relative m-auto flex h-auto w-full max-w-[1283px] flex-col rounded-[29px] border border-neutral-300 bg-gradient-to-b from-indigo-950 to-purple-950">
            <RegisterDetails />
          </div>
        </div>
      ) : null}
    </>
  );
}
