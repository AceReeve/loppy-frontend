import Image from "next/image";
import React from "react";

export default function LoginHeroSection() {
  const oldHero = () => {
    return (
      <section className="relative flex h-32 items-center justify-center lg:col-span-5 lg:h-full xl:col-span-6">
        <div className="= absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#401A65] to-[#200D31]" />
        <Image
          alt=""
          src="/assets/images/login-cover.png"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
          fill
        />
        <div className="hidden max-w-[700px] flex-col items-center justify-center text-center lg:relative lg:flex lg:p-12">
          <Image
            src="/assets/images/logo.png"
            alt="Service Hero Logo"
            width={138}
            height={141}
          />

          <h2 className="mt-6 text-2xl text-[#fff] sm:text-3xl md:text-5xl md:leading-[4rem]">
            Welcome to Service Hero, we&apos;re so happy to have you here!
          </h2>

          <div className="mt-8 flex gap-6">
            <div className="border-primary relative h-16 w-16 overflow-hidden rounded-full border-2">
              <Image
                src="/assets/images/garrett-elmore.png"
                width={223}
                height={247}
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col text-left">
              <p className="font-roboto text-[24px] font-medium text-[#fff]">
                Garrett Elmore
              </p>
              <p className="font-open-sans text-primary">
                CEO & Founder of Service Hero
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <section className="absolute  select-none bg-[url('/assets/images/login-cover-new.svg')] size-full bg-no-repeat bg-contain bg-fixed" />
  );
}
