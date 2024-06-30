import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import GoogleSignInButton from "@/src/app/auth/_components/google-sign-in-button";
import FacebookSignInButton from "@/src/app/auth/_components/facebook-sign-in-button";
import Link from "next/link";

export default function LoginView() {
  return (
    <div className="font-open-sans mt-10 text-[15px] lg:mt-0">
      <div className="text-left">
        <h1 className="font-montserrat text-primary text-2xl font-bold sm:text-[32px]">
          Login
        </h1>

        <p className="mt-2 text-[13px] font-normal text-gray-500">
          Enter your credential to access your account.
        </p>
      </div>

      <div className="mt-5 lg:mt-12">
        {error ? (
          <div
            className="mb-5 rounded border-s-4 border-red-500 bg-red-50 p-4"
            role="alert"
          >
            <p className="text-sm text-red-700">{error}</p>
          </div>
        ) : null}

        <form
          className="font-nunito grid grid-cols-6 gap-6 text-black"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-6">
            <label className="block text-sm font-bold" htmlFor="Email">
              Email
            </label>

            <input
              className="mt-1 w-full border-[#D0D3DB] font-medium shadow-none"
              id="Email"
              type="email"
              {...register("email")}
            />

            {errors.email ? (
              <p className="text-error mt-2 text-[0.8rem] font-medium">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="col-span-6">
            <label className="block text-sm font-bold" htmlFor="Password">
              {" "}
              Password{" "}
            </label>

            <input
              className="mt-1 w-full border-[#D0D3DB] font-bold shadow-none"
              id="Password"
              type="password"
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-error mt-2 text-[0.8rem] font-medium">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <button
            className="btn-gradient-primary col-span-6"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <LoadingSpinner /> : null}
            Sign In
          </button>
        </form>

        <div className="font-nunito mt-6 grid grid-cols-6 gap-6 text-black">
          <div className="col-span-6">
            <div className="flex items-center justify-center gap-8">
              <div className="h-[1px] flex-auto bg-gray-300" />
              <span className="text-gray-400">or</span>
              <div className="h-[1px] flex-auto bg-gray-300" />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <GoogleSignInButton />
              <FacebookSignInButton />
            </div>
          </div>

          <div className="col-span-6 mt-3 sm:flex sm:items-center sm:gap-4">
            <p className="font-nunito text-sm font-bold">
              No account yet?{" "}
              <Link className="text-primary underline" href="/auth/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
