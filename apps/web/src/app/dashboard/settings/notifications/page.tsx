import {
  Button,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from "@repo/ui/components/ui";
import React from "react";

export default function Notifications() {
  return (
    <div className="h-auto w-full rounded-xl bg-white p-6 py-10">
      <h1 className="py-4 text-[32px] font-semibold">Notifications</h1>
      <div className="flex h-auto w-1/2 flex-col gap-5 ">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Email Notifications</h1>
          <p className="text-sm text-gray-500">
            When you’re busy or not online, Substance can send you email
            notifications for any new direct messages or mentions of your name.
          </p>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold">Send me email notification</h1>
          <RadioGroup className="flex flex-col content-center justify-between gap-5 ">
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="SendEmail" />
              <p className="font-nunito ">Send me email notifications</p>
            </div>
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="OnceAnHour" />
              <p className="font-nunito ">Once an hour at most</p>
            </div>
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="Never" />
              <p className="font-nunito ">Never</p>
            </div>
          </RadioGroup>
        </div>
        {/*          Q2*/}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Email News & Updates</h1>
          <p className="text-sm text-gray-500">
            From time to time, we’d like to send you emails with interesting
            news about Cuboid and your workspace. You can choose which of these
            updates you’d like to receive :
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-5">
            <input type="checkbox" /> <p className="text-sm">Tips and Tricks</p>
          </div>
          <div className="flex gap-5">
            <input type="checkbox" className="aria-selected:bg-orange-500" />
            <p className="text-sm">Offers and Promotions</p>
          </div>
        </div>
        {/*Q3*/}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">Sign-in Notifications</h1>
          <p className="text-sm text-gray-500">
            These emails help keep your Substance account secure. If you haven’t
            already, you should also enable two-factor authentication.
          </p>
        </div>
        <div className="space-y-4">
          <RadioGroup className="flex flex-col content-center justify-between gap-5 space-y-4 ">
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="SendEmail" />
              <div>
                <p className="text-md font-nunito ">Most secure</p>
                <p className="text-sm text-gray-500">
                  Receive an email anytime someone signs in to your ServiHero
                  account from an unrecognized device.
                </p>
              </div>
            </div>
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="OnceAnHour" />
              <div>
                <p className="text-md font-nunito ">Standard</p>
                <p className="text-sm text-gray-500">
                  Receive an email anytime someone signs in to your ServiHero
                  account from an unrecognized device.
                </p>
              </div>
            </div>
            <div className="flex h-[20px] flex-row content-center gap-5">
              <RadioGroupItem className="my-auto" value="Never" />
              <div>
                <p className="text-md font-nunito ">
                  Don’t send me any sign-in notifications
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="col-span-4 mt-10 px-10">
        <Separator />
        <div className="- mt-4 flex justify-end gap-5">
          <Button variant="outline"> Discard</Button>
          <Button> Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
