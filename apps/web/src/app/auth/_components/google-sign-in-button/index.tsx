import Image from "next/image";
import { handleOAuthSignin } from "@/src/actions/login-actions";

export default function GoogleSignInButton() {
  return (
    <button
      className="relative flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-[#DBDBDB] bg-white"
      onClick={async () => {
        await handleOAuthSignin("google");
      }}
    >
      <Image
        src="/assets/icons/icon-google-colored.svg"
        width={0}
        height={0}
        sizes="100vw"
        className="size-4"
        alt=""
      />
      <div className="text-center font-nunito text-sm font-bold text-gray-800">
        Google
      </div>
    </button>
  );
}
