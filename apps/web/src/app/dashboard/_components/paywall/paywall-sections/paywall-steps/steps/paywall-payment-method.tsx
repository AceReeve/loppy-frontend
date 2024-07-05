import { PaymentElement } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

export default function PaywallPaymentMethod() {
  const options: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
    },
  };

  return (
    <>
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Payment Method
      </div>
      <PaymentElement className="max-w-xl" options={options} />

      {/*  <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-300 bg-white p-4">*/}
      {/*  <div className="mb-2 mt-4 flex items-center justify-between">*/}
      {/*    <label className="inline-flex items-center">*/}
      {/*      <input*/}
      {/*        type="radio"*/}
      {/*        name="paymentMethod"*/}
      {/*        className="form-radio text-orange-500"*/}
      {/*        value="creditCard"*/}
      {/*      />*/}
      {/*      <span className="m-4 text-lg font-medium leading-[27px] text-gray-800">*/}
      {/*          Credit Card*/}
      {/*        </span>*/}
      {/*    </label>*/}
      {/*    <div className="flex items-center">*/}
      {/*      <Image*/}
      {/*        width={201}*/}
      {/*        height={42}*/}
      {/*        src="/assets/images/credits.png"*/}
      {/*        alt="Credits"*/}
      {/*        className="mr-2 h-10"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className=" border border-zinc-300"></div>*/}
      {/*  <label className="mt-2 block">*/}
      {/*    Name on Card*/}
      {/*    <input type="text" className="mt-1 block h-12 w-full" />*/}
      {/*  </label>*/}
      {/*  <label className="mt-2 block">*/}
      {/*    Card Number*/}
      {/*    <input type="number" className="mt-1 block h-12 w-full" />*/}
      {/*  </label>*/}
      {/*  <div className="mb-8 mt-2 grid grid-cols-2 gap-4">*/}
      {/*    <label className="col-span-1 block ">*/}
      {/*      Expiration Date*/}
      {/*      <input type="date" className="mt-1 block h-12 w-full" />*/}
      {/*    </label>*/}
      {/*    <label className="col-span-1 block">*/}
      {/*      CVV*/}
      {/*      <input type="number" className="mt-1 block h-12 w-full" />*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
