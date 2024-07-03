"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Checkbox } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import Link from "next/link";
import GoogleSignInButton from "@/src/app/auth/_components/google-sign-in-button";
import FacebookSignInButton from "@/src/app/auth/_components/facebook-sign-in-button";
import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { LoginSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import RecoverPassword from "@/src/app/auth/forgot-password/password-recover";
import ChangePassword from "../reset-password/password-reset";
import PasswordChanged from "../reset-password/password-changed";
import PasswordVerification from "@/src/app/auth/forgot-password/password-verification";

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [process, setProcess] = useState(0);
  const [view, setView] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const nextProcess = () => {
    setProcess(process + 1);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const views = [
    {
      component: <RecoverPassword nextProcess={nextProcess} />,
    },
    {
      component: <PasswordVerification />,
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
          className={"m-auto"}
        />
      </div>
      {views[process].component}
    </>
  );
}
