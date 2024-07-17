import Image from "next/image";
import { Button } from "@repo/ui/components/ui";
import { handleOAuthSignin } from "@/src/actions/login-actions";

export default function FacebookSignInButton() {
  return (
    <Button
      className="relative flex h-12 flex-1 items-center  gap-2 rounded-lg border border-[#DBDBDB] bg-white py-2"
      onClick={async () => {
        await handleOAuthSignin("facebook");
      }}
      variant="ghost"
    >
      <Image
        src="/assets/icons/icon-fb-colored.svg"
        width={15}
        height={15}
        className="size-auto"
        alt=""
      />
      <div className="m-auto text-center font-nunito text-sm font-semibold text-gray-800">
        Login with Facebook
      </div>
    </Button>
  );
}
