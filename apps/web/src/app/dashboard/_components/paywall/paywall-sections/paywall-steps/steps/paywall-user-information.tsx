import { AddressElement } from "@stripe/react-stripe-js";
import { StripeAddressElementOptions } from "@stripe/stripe-js";

export default function PaywallUserInformation() {
  const addressElementOptions: StripeAddressElementOptions = {
    mode: "billing",
    display: {
      name: "split",
    },
    allowedCountries: ["US"],
    defaultValues: {
      // By default, line 2, city, state, etc. is collapsed
      // so provide default value to expand automatically
      address: {
        state: "-",
        country: "US",
      },
    },
  };

  return (
    <>
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Your Information
      </div>
      <AddressElement id="payment-element" options={addressElementOptions} />

      {/*<div className="grid grid-cols-1 gap-6">*/}
      {/*  <div className="grid grid-cols-2 gap-4">*/}
      {/*    <label className="text-base font-medium text-black">*/}
      {/*      First Name*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="mt-1 block h-12 w-full "*/}
      {/*        placeholder="First Name"*/}
      {/*        {...register("firstname")}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*    <label className="block">*/}
      {/*      Last Name*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="mt-1 block h-12 w-full "*/}
      {/*        placeholder="Last Name"*/}
      {/*        {...register("lastname")}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*  <label className="block">*/}
      {/*    Email Address*/}
      {/*    <input*/}
      {/*      type="email"*/}
      {/*      className="mt-1 block h-12 w-full "*/}
      {/*      placeholder="Email Address"*/}
      {/*      {...register("email")}*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <label className="block">*/}
      {/*    Address*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      className="mt-1 block h-12 w-full "*/}
      {/*      placeholder="Address"*/}
      {/*      autoComplete="address-line1"*/}
      {/*      {...register("address")}*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*  <div className="grid grid-cols-3 gap-4">*/}
      {/*    <label className="col-span-1 block">*/}
      {/*      Zip Code*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="mt-1 block h-12 w-full "*/}
      {/*        placeholder="Zip"*/}
      {/*        autoComplete="postal-code"*/}
      {/*        {...register("zipcode")}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*    <label className="col-span-1 block">*/}
      {/*      City*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="mt-1 block h-12 w-full "*/}
      {/*        placeholder="City"*/}
      {/*        {...register("city")}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*    <label className="col-span-1 block">*/}
      {/*      State*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        className="mt-1 block h-12 w-full "*/}
      {/*        placeholder="State"*/}
      {/*        {...register("state")}*/}
      {/*      />*/}
      {/*    </label>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
