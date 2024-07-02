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

    <section className="bg-[url('/assets/images/login-cover-new.svg')] size-full bg-no-repeat bg-contain bg-fixed">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Hero Section */}
        {/* <LoginHeroSection />*/}

        <div className="relative flex items-center justify-center lg:h-full lg:col-span-6">
          <Image
            ref={loginObject}
            alt="login-cover"
            src="/assets/images/login-object.svg"
            width={630}
            height={570}
            //className=" z-20  max-h-[630px] w[730px] -ml-40 my-auto size-full"
            className=" z-20 m-auto select-none"
            draggable={false}
          />
        </div>

        {/* Sign Up / Login Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:p-0 lg:px-16 lg:py-12 xl:col-span-6">
          <div className=" flex-1 xl:max-w-[500px]  p-10 rounded-2xl drop-shadow-xl bg-white z-20 h-auto xl:p-4">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </section>
  );
}
