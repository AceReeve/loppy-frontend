import Image from "next/image";
import { Button } from "@repo/ui/components/ui";
import { handleOAuthSignin } from "@/src/actions/login-actions";

export default function GoogleSignInButton() {
  return (
    <Button
      className="relative flex h-12 flex-1 items-center gap-2 rounded-lg border border-[#DBDBDB] bg-white py-2"
      onClick={async () => {
        await handleOAuthSignin("google");
      }}
      variant="ghost"
    >
      <Image
        src="/assets/icons/icon-google-colored.svg"
        width={15}
        height={15}
        className="size-auto"
        alt=""
      />
      <div className="m-auto flex-1 text-center font-nunito text-sm font-semibold text-gray-800">
        Login with Google
      </div>
    </Button>
  );
}
