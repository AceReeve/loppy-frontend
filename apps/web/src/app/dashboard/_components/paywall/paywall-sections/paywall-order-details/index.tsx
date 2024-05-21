import { usePaywallState } from "@/src/providers/paywall-provider";
import Image from "next/image";
import { formatDecimal } from "@repo/hooks-and-utils/number-utils";

export default function PaywallOrderDetails() {
  const { onPromoCodeSubmit, onSubmit, paymentPlan } = usePaywallState();
  const tax = 10;

  return (
    <div className="mx-auto max-w-[336px] font-nunito">
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Order Details
      </div>

      <div className="mt-8 flex items-center gap-4">
        <Image
          src="/assets/images/logo.png"
          width={138}
          height={141}
          className="h-[104.98px] w-[105px] object-contain"
          alt=""
        />
        <div>
          <div className="text-lg font-medium leading-[27px] text-gray-800">
            {paymentPlan?.name}
          </div>
          <div className="mt-1 text-base font-medium leading-normal text-gray-500">
            {paymentPlan?.name}
          </div>
          <div className="mt-1 text-lg font-semibold leading-[27px] text-gray-800">
            ${formatDecimal(paymentPlan?.cost ?? 0, 2)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="mt-5 font-medium leading-normal text-gray-500">
          Subtotal
        </div>
        <div className="mt-5 text-lg font-semibold leading-normal text-gray-800">
          ${formatDecimal(paymentPlan?.cost ?? 0, 2)}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mt-5 font-medium leading-normal text-gray-500">Tax</div>
        <div className="mt-5 text-lg font-semibold leading-normal text-gray-800">
          ${formatDecimal(tax, 2)}
        </div>
      </div>

      <div className="mt-4 border-t-[0.5px] border-[#D7D7D7]"></div>
      <div className="mt-2 flex justify-between">
        <div className="mt-2 font-medium leading-normal text-gray-700">
          Total
        </div>
        <div className="mt-2 font-bold leading-[30px] text-gray-800">
          ${formatDecimal((paymentPlan?.cost ?? 0) + tax, 2)}
        </div>
      </div>

      {/* Coupon Code Form */}
      <form onSubmit={onPromoCodeSubmit}>
        <div className="mt-8 flex justify-between">
          <div className="font-medium text-black">Promo Code</div>
          <button
            className="text-base font-semibold leading-normal text-orange-500 text-opacity-70"
            type="submit"
          >
            Apply
          </button>
        </div>
        <div className="mt-2 flex justify-between">
          <input
            type="text"
            className="mt-1 block h-12 flex-1 rounded-lg border border-gray-200 bg-white shadow-soft"
          />
        </div>
      </form>

      <div className="mt-2 flex justify-between">
        <button
          className="btn-gradient-primary-lg mt-7 w-full"
          onClick={onSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
