"use client";
import React, { Suspense, useRef } from "react";
import LoginHeroSection from "./_components/login-hero-section";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loginObject = useRef(null);

  useGSAP(() => {
    gsap.to(loginObject.current, {
      y: -20, // Move 20 pixels upward
      duration: 4.5,
      ease: "power1.inOut", // Smooth acceleration and deceleration
      yoyo: true, // Animates back to the original position
      repeat: -1, // Repeats the animation indefinitely
    });
  });

  return (
    /*    <section className="bg-white flex m-auto flex-col">
            <LoginHeroSection />
            <main className="flex h-screen justify-end items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:p-0 lg:px-16 lg:py-12 xl:col-span-6 content-center  ">
              <div className=" flex-1 lg:max-w-[600px] p-10 rounded-2xl drop-shadow-xl bg-white z-20 ">
                <Suspense>{children}</Suspense>
              </div>
            </main>
          </section>*/

    <section className="bg-white">
      <LoginHeroSection />
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Hero Section */}
        <div className="relative flex h-32 items-center justify-center lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            ref={loginObject}
            alt="login-cover"
            src="/assets/images/login-object.svg"
            //className=" z-20  max-h-[630px] w[730px] -ml-40 my-auto size-full"
            className=" z-20 my-auto ml-40 flex min-h-[670px] max-h-[670px] max-w-[630px] relative select-none mr-auto"
            draggable={false}
            fill
          />
        </div>

        {/* Sign Up / Login Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:p-0 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" flex-1 lg:max-w-[500px] p-10 rounded-2xl drop-shadow-xl bg-white z-20 h-auto">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </section>
  );
}
