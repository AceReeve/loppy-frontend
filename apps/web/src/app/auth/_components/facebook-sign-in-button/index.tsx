import Image from "next/image";
import { handleOAuthSignin } from "@/src/actions/login-actions";

export default function FacebookSignInButton() {
  return (
    <button
      className="relative flex h-12 flex-1 items-center  gap-2 rounded-lg border border-[#DBDBDB] bg-white"
      onClick={async () => {
        await handleOAuthSignin("facebook");
      }}
      type="button"
    >
      <Image
        src="/assets/icons/icon-fb-colored.svg"
        width={0}
        height={0}
        sizes="100vw"
        className="size-5 absolute  mx-3"
        alt=""
      />
      <div className="font-nunito text-center text-sm font-semibold text-gray-800 m-auto">
        Login with Facebook
      </div>
    </button>
  );
}
