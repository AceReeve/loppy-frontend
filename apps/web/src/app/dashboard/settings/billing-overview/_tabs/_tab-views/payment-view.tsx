"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Input,
  RadioCards,
  Separator,
} from "@repo/ui/components/ui";
import { Card } from "iconsax-react";
import { Check } from "lucide-react";
import Image from "next/image";
import type { PlanProps } from "@/src/app/dashboard/settings/billing-overview/_components/plan-card.tsx";
import type { CardDetailProps } from "@/src/app/dashboard/settings/billing-overview/_components/payment-card.tsx";
import CardPayment from "@/src/app/dashboard/settings/billing-overview/_components/payment-card.tsx";

interface Plan {
  plan: PlanProps;
  prevProcess: () => void;
}

export default function PaymentView({ plan, prevProcess }: Plan) {
  //const [paymentMethods, setPaymentMethods] = useState<CardDetailProps[]>([
  const paymentMethods: CardDetailProps[] = [
    {
      id: 1,
      cardSchemes: "Mastercard",
      cardNumber: "4028 2931 3925 9583",
      expiration: "05/24/2024",
      isPrimary: true,
      value: "ID1",
    },
    {
      id: 2,
      cardSchemes: "Visa",
      cardNumber: "1235 5823 8254 9234",
      expiration: "05/24/2024",
      isPrimary: false,
      value: "ID2",
    },
    {
      id: 3,

      cardSchemes: "Visa",
      cardNumber: "1235 5823 8254 9234",
      expiration: "05/24/2024",
      isPrimary: false,
      value: "ID3",
    },
    {
      id: 4,
      cardSchemes: "Visa",
      cardNumber: "1235 5823 8254 9234",
      expiration: "05/24/2024",
      isPrimary: false,
      value: "ID4",
    },
    {
      id: 5,
      cardSchemes: "Visa",
      cardNumber: "1235 5823 8254 9234",
      expiration: "05/24/2024",
      isPrimary: false,
      value: "ID5",
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    // Check if there are any payment methods
    if (paymentMethods.length > 0) {
      // Set the first payment method as the initial state
      setPaymentMethod(paymentMethods[0].value.toString());
    }
  }, [paymentMethods]); // Dependency array: run this effect when paymentMethods changes

  return (
    <div className="flex items-start justify-between gap-16 p-4">
      <div className="w-2/3 space-y-10 ">
        <div>
          <h1>Select Payment Method</h1>
          <div className="custom-scrollbar max-h-[300px] space-y-2 overflow-y-auto rounded border p-2">
            <RadioCards value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((payment) => (
                <CardPayment
                  value={payment.value}
                  key={payment.id}
                  id={payment.id}
                  cardSchemes={payment.cardSchemes}
                  cardNumber={payment.cardNumber}
                  expiration={payment.expiration}
                  isPrimary={payment.isPrimary}
                  selected={paymentMethod === payment.value.toString()}
                />
              ))}
            </RadioCards>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full border-2 border-dashed border-orange-500 bg-white py-5 text-orange-500 hover:border-solid hover:bg-gray-200">
                  + Add another Card
                </Button>
              </DialogTrigger>
              <DialogContent className="py-15 max-h-[1000px] max-w-[800px] px-6 text-slate-600">
                <DialogHeader>
                  <div className="flex gap-2 text-lg text-slate-600">
                    <Card />
                    Add Debit/Credit Card
                  </div>
                  <Separator className="m-0" />
                </DialogHeader>
                <div className="grid grid-cols-8 gap-5">
                  <div className="col-span-8">
                    <p>Card Number</p>
                    <div className="relative flex w-full flex-row justify-start justify-between gap-4">
                      <Image
                        src="/assets/icons/billing-overview/master-card-icon.svg"
                        alt=""
                        width={100}
                        height={100}
                        className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500"
                      />
                      <Input
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <p>Valid Thru</p>
                    <Input placeholder="00/00" />
                  </div>
                  <div className="col-span-4">
                    <p>CVV</p>
                    <Input placeholder="0000" />
                  </div>
                  <div className="col-span-8">
                    <p>Card Holder</p>
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="px-10">Add </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <h1>Billing Information</h1>
          <div className="space-y-2 rounded border">
            <div className="grid grid-cols-8 gap-10 p-4">
              <div className="col-span-4 space-y-2">
                <p className="text-sm">First Name</p>
                <Input
                  autoComplete="off"
                  placeholder="First Name"
                  defaultValue="Raphael"
                />
              </div>
              <div className="col-span-4 space-y-2">
                <p className="text-sm">Last Name</p>
                <Input
                  autoComplete="off"
                  placeholder="Last Name"
                  defaultValue="Adrian"
                />
              </div>
              <div className="col-span-8 space-y-2">
                <p className="text-sm"> Address</p>
                <Input
                  autoComplete="off"
                  placeholder="Address"
                  defaultValue="#1 Japan Two Three 45 Street Nippon, Edo Earth"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 items-start space-y-4 rounded border p-4 ">
        <div>
          <h1>Summary</h1>
          <Separator />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2 ">
            <div className="h-10 w-10 bg-orange-500" />
            <div>
              <p>{plan.header}</p>
              <p>{plan.description}</p>
            </div>
          </div>
          <div className="flex flex-col">
            ${plan.price}
            <button
              type="button"
              className="text-sm text-orange-500 underline"
              onClick={prevProcess}
            >
              Change
            </button>
          </div>
        </div>

        <Separator />

        <div className="min-h-[200px] space-y-2 px-3  text-center text-sm text-gray-500">
          {/*          {props.contents.map((content, index) => (
            <p className="flex gap-2 text-left" key={index}>
              <Check className="my-auto flex-shrink-0 text-justify text-green-600 " />
              {content.detail}
            </p>
          ))}*/}
          {/*          {Array.from({
            length: 5,
          }).map((index) => (
            <div key={index} className="flex gap-2 text-left">
              <Check className="my-auto flex-shrink-0 text-justify text-green-600 " />
              <p>Access for up to 2 users</p>
            </div>
          ))}*/}

          {plan.contents.map((content) => (
            <div key={content.id} className="flex gap-2 text-left">
              <Check className="my-auto flex-shrink-0 text-justify text-green-600 " />
              <p>{content.detail}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <h1>Subtotal</h1>
          <h1 className="flex flex-col">
            ${plan.price}.00/Month
            <span className="text-sm">12 Months</span>
          </h1>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <h1>Total</h1> <h1>${plan.price * 12}.00</h1>
        </div>
        <Button className="w-full">Proceed</Button>
      </div>
    </div>
  );
}
