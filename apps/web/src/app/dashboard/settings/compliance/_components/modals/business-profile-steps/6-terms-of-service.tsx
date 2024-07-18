import React, { useState } from "react";
import { Checkbox, Label } from "@repo/ui/components/ui";
import Link from "next/link";

export default function TermsOfService() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <p className="mt-2 text-gray-500">
        Salesmsg will process your personal data according to the{" "}
        <Link
          href="https://www.twilio.com/legal/privacy"
          className="text-primary"
        >
          Twilio Privacy Statement
        </Link>
      </p>

      <div className="mt-4 flex items-center">
        <Checkbox
          id="terms"
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="terms" className="ml-2 text-sm font-normal">
          I declare that the information provided is accurate. I acknowledge
          that Twilio will be processing the information provided for the
          purposes of identity verification, and that Twilio reserves the right
          to retain the Business Profile information after account closure in
          the case of a traceback from a regulatory authority or equivalent.
        </Label>
      </div>
    </>
  );
}
