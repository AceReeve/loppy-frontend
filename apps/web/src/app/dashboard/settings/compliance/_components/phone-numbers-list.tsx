import { forwardRef } from "react";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui";
import { cn } from "@repo/ui/utils";
import { type GetAvailableLocalNumbersResponse } from "@repo/redux-utils/src/endpoints/types/phone-numbers";

interface PhoneNumbersType {
  dataSet: GetAvailableLocalNumbersResponse[];
}

const PhoneNumbersList = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RadioGroup> & PhoneNumbersType
>(({ dataSet, className, ...props }, ref) => {
  return (
    <>
      {dataSet.length > 0 ? (
        <RadioGroup className={cn(className)} {...props} ref={ref}>
          {dataSet.map((number, index) => (
            <div
              key={number.phoneNumber}
              className="mb-2 flex items-center justify-between text-sm"
            >
              <div>
                <RadioGroupItem
                  value={number.phoneNumber}
                  id={`phone-${index.toString()}`}
                />
                <label htmlFor={`phone-${index.toString()}`} className="ml-2">
                  {number.friendlyName}
                </label>
              </div>
              <span className="text-gray-500">
                {number.isoCountry}
                {number.region ? " - " : " "}
                {number.region}
              </span>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="text-sm">
          No numbers available. Try other area codes.
        </div>
      )}
    </>
  );
});
PhoneNumbersList.displayName = RadioGroup.displayName;

export default PhoneNumbersList;
