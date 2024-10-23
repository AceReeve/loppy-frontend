import {
  ArrowLeftRight,
  BadgeDollarSign,
  CakeIcon,
  CloudRainIcon,
  MailIcon,
  UserPlus,
} from "lucide-react";
import { Message } from "iconsax-react";
import React from "react";

const nodeIcons: Record<string, React.ReactNode> = {
  "Birthday Reminder": <CakeIcon />,
  "Send Email": <MailIcon />,
  "Customer Replied": <Message />,
  "Contact Created": <UserPlus />,
  "Opportunity Status Changed": <ArrowLeftRight />,
  "Create Update Opportunity": <BadgeDollarSign />,
  "Weather Reminder": <CloudRainIcon />,
};
export { nodeIcons };
