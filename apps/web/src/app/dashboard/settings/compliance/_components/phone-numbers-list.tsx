import { forwardRef } from "react";
import { Button, RadioGroup, RadioGroupItem } from "@repo/ui/components/ui";
import { Refresh } from "iconsax-react";
import { cn } from "@repo/ui/utils";

const phoneNumbers = [
  "(385) 220-0152",
  "(385) 200-9945",
  "(385) 324-7458",
  "(385) 220-8269",
  "(385) 330-5734",
];

const PhoneNumbersList = forwardRef<
  React.ElementRef<typeof RadioGroup>,
  React.ComponentPropsWithoutRef<typeof RadioGroup>
>(({ className, ...props }, ref) => {
  return (
    <div>
      <Button variant="outline" size="sm" className="mb-4 gap-2">
        <Refresh size={12} />
        Refresh
      </Button>
      <div className="p-4">
        <RadioGroup className={cn(className)} {...props} ref={ref}>
          {phoneNumbers.map((number, index) => (
            <div
              key={number}
              className="mb-2 flex items-center justify-between text-sm"
            >
              <div>
                <RadioGroupItem
                  value={number}
                  id={`phone-${index.toString()}`}
                />
                <label htmlFor={`phone-${index.toString()}`} className="ml-2">
                  {number}
                </label>
              </div>
              <span className="text-gray-500">Utah, UT</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
});
PhoneNumbersList.displayName = RadioGroup.displayName;

export default PhoneNumbersList;
