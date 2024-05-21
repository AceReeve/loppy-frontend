import React, { Suspense } from "react";
import LoginHeroSection from "./_components/login-hero-section";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Hero Section */}
        <LoginHeroSection />

        {/* Sign Up / Login Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:p-0 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl flex-1 lg:max-w-[600px] xl:p-4">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </section>
  );
}
