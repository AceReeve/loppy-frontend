"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@repo/ui/components/ui";
import Image from "next/image";
import { CoinsIcon } from "lucide-react";
import { Card } from "iconsax-react";
import CardPlan from "@/src/app/dashboard/settings/billing-overview/_components/plan-card.tsx";
import type { PlanProps } from "@/src/app/dashboard/settings/billing-overview/_components/plan-card.tsx";
import PaymentView from "@/src/app/dashboard/settings/billing-overview/_tabs/_tab-views/payment-view.tsx";

export default function BillingInformationTab() {
  const [process, setProcess] = useState(0);
  //  const [monthly, setMonthly] = useState(true);
  const monthly = true;
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openManageSeats, setOpenManageSeats] = useState(false);
  const [openManageNumbers, setOpenManageNumbers] = useState(false);

  const [openBuyCredits, setOpenBuyCredits] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanProps>({
    id: "",
    header: "",
    price: 0,
    monthly: false,
    contents: [],
    current: false,
    description: "",
    handleButtonClick: () => {
      null;
    },
  });

  /*  const nextProcess = () => {
    setProcess(process + 1);
  };*/
  const prevProcess = () => {
    setProcess(process - 1);
  };
  const selectPlan = (planID: PlanProps) => {
    setProcess(process + 1);
    setSelectedPlan(planID);
  };
  const handlePopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  const handleOpenManageSeats = () => {
    setOpenManageSeats(!openManageSeats);
  };
  const handleOpenManageNumbers = () => {
    setOpenManageNumbers(!openManageNumbers);
  };

  const handleBuyCredits = () => {
    setOpenBuyCredits(!openBuyCredits);
  };

  const plans = [
    {
      id: "1",
      header: "Essential Plan",
      description: "Starter Hero",
      price: 99,
      contents: [
        {
          id: 1,
          detail: "Access for up to 2 users",
        },
        {
          id: 2,
          detail: "Basic sales & marketing automation",
        },
        {
          id: 3,
          detail: "Email marketing integration",
        },
        {
          id: 4,
          detail: "Lead & contact management",
        },
        {
          id: 5,
          detail: "Customer support via email",
        },
        {
          id: 6,
          detail: "Reporting & dashboard analytics",
        },
      ],
      current: true,
    },
    {
      id: "2",
      header: "Professional Plan",
      description: "Advanced Hero",
      price: 299,
      contents: [
        {
          id: 1,
          detail: "Access up to 5 users",
        },
        {
          id: 2,
          detail: "Advanced automation + workflow capabilities",
        },
        {
          id: 3,
          detail: "API access for custom integrations (ServiceTitan, HCP,etc)",
        },
        {
          id: 4,
          detail:
            "Multi-channel campaign management (email, SMS, social media)",
        },
        {
          id: 5,
          detail: "Priority email & chat support",
        },
        {
          id: 6,
          detail: "Customer list segmentation & grouping",
        },
        {
          id: 7,
          detail: "Everything in Essential Plan",
        },
      ],
      current: false,
    },
    {
      id: "3",
      header: "Corporate Plan",
      description: "Corporate Hero",
      price: 499,
      contents: [
        {
          id: 1,
          detail: "Unlimited user access",
        },
        {
          id: 2,
          detail: "Customizable CRM to fit corporate needs",
        },
        {
          id: 3,
          detail: "Custom development options for deep integrations",
        },
        {
          id: 4,
          detail: "Phone support with SLA (Service Level Agreement)",
        },
        {
          id: 5,
          detail: "Advanced security features",
        },
        {
          id: 6,
          detail: "Advanced analytics with predictive insights",
        },
        {
          id: 7,
          detail: "Dedicated account manage r",
        },
        {
          id: 8,
          detail: "Onboarding & ongoing training",
        },
        {
          id: 9,
          detail: "Everything in Professional Plan",
        },
      ],
      current: false,
    },
  ];

  const [inputValue, setInputValue] = useState<number>(1);
  const seatPrice = 5.04;

  const total = (inputValue * seatPrice).toFixed(2);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (/^\d*$/.test(value)) {
      setInputValue(Number(value));
    }
  };
  const planSelection = () => {
    return (
      <div className="flex flex-wrap items-start justify-center gap-10">
        {plans.map((plan) => (
          <CardPlan
            id={plan.id}
            key={plan.id}
            header={plan.header}
            description={plan.description}
            price={plan.price}
            monthly={monthly}
            contents={plan.contents}
            current={plan.current}
            handleButtonClick={selectPlan}
          />
        ))}
      </div>
    );
  };

  /*  const paymentView = () => {
    return (

    );
  };*/

  const views = [
    {
      id: 1,
      view: planSelection(),
    },
    {
      id: 2,
      view: <PaymentView plan={selectedPlan} prevProcess={prevProcess} />,
    },
  ];

  /*  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Page Under Construction
      </div>
      <div className="text-md mt-4 max-w-[1000px] text-center font-nunito font-normal leading-normal text-gray-700">
        We are currently working on this page to provide you with an enhanced
        experience. Please check back later for updates.
      </div>
      <div className="text-md mt-4 max-w-[1000px] text-center font-nunito font-normal leading-normal text-gray-700">
        Our team is dedicated to bringing you the best content and features.
        During this period, we are making significant improvements to ensure a
        better user experience. We apologize for any inconvenience this may
        cause and appreciate your understanding.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt=""
      />
    </div>
  );*/

  return (
    <div className="py-4">
      <div className="space-y-8">
        {/*<h1 className="font-medium text-slate-600">Usage</h1>*/}
        <div>
          <p className="font-semibold text-slate-600"> Usage</p>
          <div className="flex justify-between rounded border p-4 ">
            <div className="flex gap-2">
              <Image
                src="/assets/images/logo-loppy.png"
                alt=""
                width={75}
                height={75}
                className="m-3"
              />
              <div className=" my-auto flex flex-col font-poppins text-slate-600">
                <h1 className="font-semibold">Essential Plan (26 days)</h1>
                <p>ID: 12521958UAI2</p>
                <p>Renewal Date: August 30, 2024</p>
              </div>
            </div>
            <div className="flex items-start gap-10 text-slate-600">
              <p className="py-2">
                <b>Numbers:</b> 0 of 3
              </p>
              <p className="py-2">
                <b>Seats:</b> 0 of 3
              </p>
              <p className="py-2">
                <b>Message Credits:</b> 2492
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-4">
                    Manage
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handlePopUp}
                  >
                    Upgrade Plan
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleBuyCredits}
                  >
                    Buy Credits
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleOpenManageSeats}
                  >
                    Manage Seats
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleOpenManageNumbers}
                  >
                    Manage Numbers
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="font-semibold text-slate-600"> Payment Method </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded  px-5 py-2"> + Add</Button>
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
          <div className="flex justify-between rounded border p-4 ">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/billing-overview/master-card-icon.svg"
                alt=""
                width={75}
                height={75}
                className="m-3"
              />
              <div className=" my-auto flex w-[350px] flex-col font-poppins text-slate-600">
                <div className="flex justify-between">
                  <h1 className="font-semibold">Mastercard</h1>
                  <p className="flex items-center rounded-full bg-orange-500 px-4 text-sm text-white">
                    Primary
                  </p>
                </div>
                <p>**** **** **** 4002</p>
                <p>Expiry on 07/20/2024</p>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                className="w-[100px] px-4 hover:bg-red-500/80 hover:text-white"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openBuyCredits} onOpenChange={handleBuyCredits}>
        <DialogContent className="py-15 max-h-[1000px] max-w-[800px] px-6 text-slate-600">
          <DialogHeader>
            <div className="flex gap-2 text-lg text-slate-600">
              <CoinsIcon />
              Add Credits
            </div>
            <Separator className="m-0" />
            <p className="text-sm font-light italic">
              Message credits are used to send and receive messages.
            </p>
          </DialogHeader>

          <p className="font-medium">Available Message Credits: 2,492</p>
          <Select defaultValue="first">
            <SelectGroup>
              <SelectLabel className="text-md p-0">
                Select amount of credits
              </SelectLabel>
              <SelectTrigger className="w-full" variant="outline">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">$10 - 1000 Credits</SelectItem>
                <SelectItem value="second">$20 - 2000 Credits</SelectItem>
                <SelectItem value="third">$30 - 3000 Credits</SelectItem>
                <SelectItem value="fourth">$40 - 4000 Credits</SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>

          <Select defaultValue="first">
            <SelectGroup>
              <SelectLabel className="text-md p-0">
                Select Payment Method
              </SelectLabel>
              <SelectTrigger className="w-full" variant="outline">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first" className="w-full">
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2481</p>
                  </div>
                </SelectItem>
                <SelectItem value="second">
                  {" "}
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2482</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <div className="flex justify-end">
            <Button className="px-6">Add Credits</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openPopUp} onOpenChange={handlePopUp}>
        <DialogContent className="py-15 max-h-[1000px] max-w-[1120px]  px-10">
          <div className="flex w-full flex-col text-center text-slate-600">
            <h1 className="text-5xl font-semibold">ServiHero Plan</h1>
            <p className="text-sm italic">
              “Choose the plan that best fits your needs.”
            </p>
          </div>
          <Separator />
          {views[process].view}
          <Separator />
        </DialogContent>
      </Dialog>

      <Dialog open={openManageSeats} onOpenChange={handleOpenManageSeats}>
        <DialogContent className="py-15 max-h-[1000px] max-w-[800px] px-6 text-slate-600">
          <DialogHeader>
            <div className="flex gap-2 text-lg text-slate-600">
              <CoinsIcon />
              Buy Seats
            </div>
            <Separator className="m-0" />
          </DialogHeader>

          <div className="flex justify-between">
            <h1 className="font-semibold text-slate-600">
              Quantity of new seats
            </h1>
            <div className="flex flex-col">
              <Input
                placeholder="0"
                value={inputValue}
                onChange={handleInputChange}
              />
              <h1>Total: ${total} </h1>
            </div>
          </div>

          <Select defaultValue="first">
            <SelectGroup>
              <SelectLabel className="text-md p-0 text-slate-600">
                Select Payment Method
              </SelectLabel>
              <SelectTrigger className="w-full" variant="outline">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first" className="w-full">
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2481</p>
                  </div>
                </SelectItem>
                <SelectItem value="second">
                  {" "}
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2482</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <div className="flex justify-end">
            <Button className="px-6">Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openManageNumbers} onOpenChange={handleOpenManageNumbers}>
        <DialogContent className="py-15 max-h-[1000px] max-w-[800px] px-6 text-slate-600">
          <DialogHeader>
            <div className="flex gap-2 text-lg text-slate-600">
              <CoinsIcon />
              Buy Numbers
            </div>
            <Separator className="m-0" />
          </DialogHeader>

          <div className="flex justify-between">
            <h1 className="font-semibold text-slate-600">
              Quantity of new Numbers
            </h1>
            <div className="flex flex-col">
              <Input
                placeholder="0"
                value={inputValue}
                onChange={handleInputChange}
              />
              <h1>Total: ${total} </h1>
            </div>
          </div>

          <Select defaultValue="first">
            <SelectGroup>
              <SelectLabel className="text-md p-0 text-slate-600">
                Select Payment Method
              </SelectLabel>
              <SelectTrigger className="w-full" variant="outline">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first" className="w-full">
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2481</p>
                  </div>
                </SelectItem>
                <SelectItem value="second">
                  {" "}
                  <div className="flex gap-x-5">
                    <Image
                      src="/assets/icons/billing-overview/master-card-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>**** **** **** 2482</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <div className="flex justify-end">
            <Button className="px-6">Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
