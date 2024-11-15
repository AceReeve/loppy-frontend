import { CloudRainIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

const leadIcons: Record<string, React.ReactNode> = {
  "Facebook Advertising": (
    <Image
      src="/assets/icons/icon-fb-colored.svg"
      width={15}
      height={15}
      className="size-auto"
      alt=""
    />
  ),
  Google: (
    <Image
      src="/assets/icons/icon-google-colored.svg"
      width={15}
      height={15}
      className="size-auto"
      alt=""
    />
  ),
  Test: <CloudRainIcon />,
};
export { leadIcons };
