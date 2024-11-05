import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui";

interface DefaultAvatarProps {
  image: string;
  name?: string;
  className?: string;
  children?: ReactNode;
}
function DefaultAvatar(props: DefaultAvatarProps) {
  return (
    <Avatar className={props.className ?? ""}>
      <AvatarImage
        className="bg-primary object-cover select-none"
        src={props.image}
      />
      <AvatarFallback className="bg-primary/30 border-2 border-white font-bold text-inherit select-none">
        {props.children ??
          props.name?.split(" ").map((n) => n[0].toUpperCase())}
      </AvatarFallback>
    </Avatar>
  );
}

export { DefaultAvatar };
