import Image from "next/image";
import { TrashIcon } from "lucide-react";
import React from "react";
import { RadioCardsItem } from "@repo/ui/components/ui";

export interface CardDetailProps {
  id: number;
  cardSchemes: "Visa" | "Mastercard" | "American Express" | "Union Pay" | "";
  cardNumber: string;
  expiration: string;
  isPrimary: boolean;
  value: string;
  selected?: boolean;
}
export default function CardPayment(props: CardDetailProps) {
  return (
    <RadioCardsItem
      className={`${props.selected ? "bg-orange-500/10" : ""} flex space-y-1 px-3 py-2 text-left`}
      value={props.value}
    >
      <Image
        src="/assets/icons/billing-overview/master-card-icon.svg"
        alt=""
        width={75}
        height={75}
        className="m-3"
      />

      <div className=" my-auto flex w-full flex-col font-poppins  text-slate-600">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.cardSchemes}</h1>
          <div className="flex space-x-4 ">
            {props.isPrimary ? (
              <p className="flex items-center rounded-full bg-orange-500 px-4 text-sm font-normal text-white">
                Primary
              </p>
            ) : null}
            <TrashIcon className="" />
          </div>
        </div>
        <p className="font-normal">
          **** **** **** {props.cardNumber.slice(14)}
        </p>
        <p className="font-normal">Expiry on {props.expiration}</p>
      </div>
    </RadioCardsItem>
  );
}
