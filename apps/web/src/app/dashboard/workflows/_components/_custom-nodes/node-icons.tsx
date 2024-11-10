import {
  ArrowLeftRight,
  BadgeDollarSign,
  CakeIcon,
  CloudRainIcon,
  MailIcon,
  UserPlus,
} from "lucide-react";
import React from "react";

const nodeIcons: Record<string, React.ReactNode> = {
  "Birthday Reminder": <CakeIcon className="stroke-current" />,
  "Send Email": <MailIcon className="stroke-current" />,
  "Send SMS": <MailIcon className="stroke-current" />,
  "Customer Replied": <UserPlus className="stroke-current" />,
  "Contact Created": <UserPlus className="stroke-current" />,
  "Opportunity Status Changed": <ArrowLeftRight className="stroke-current" />,
  "Opportunity Created": <ArrowLeftRight className="stroke-current" />,
  "Opportunity Changed": <ArrowLeftRight className="stroke-current" />,
  "Pipeline Stage Changed": <ArrowLeftRight className="stroke-current" />,
  "Stale Opportunity": <ArrowLeftRight className="stroke-current" />,
  "Remove Opportunity": <ArrowLeftRight className="stroke-current" />,
  "Create Update Opportunity": <BadgeDollarSign className="stroke-current" />,
  "Weather Reminder": <CloudRainIcon className="stroke-current" />,
};
export { nodeIcons };
