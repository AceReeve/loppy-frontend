import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export default function TeamsAddTeam(props: TeamsSetupStepsProps) {
  const [invitesList, setInvitesList] = useState<string[]>([]);

  return (
    <>
      <div className="inline-flex w-full flex-col items-start justify-center gap-4"></div>
      <div className="inline-flex w-full flex-col items-start justify-center gap-4">
        <div className="font-nunito font-medium leading-relaxed text-white">
          Send Invite
        </div>
        <div className="relative flex min-h-full w-full flex-col items-start justify-start">
          <InvitesList
            className="w-full flex-wrap rounded-xl bg-white pr-32"
            invitesList={invitesList}
            setInvitesList={setInvitesList}
          />
          <button
            className="btn-solid-primary absolute right-0 h-full w-[122px] gap-2 rounded-xl"
            onClick={() => {
              props.handleSubmitInvitedList(invitesList);
            }}
          >
            Next
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="inline-flex w-full flex-col items-start justify-center gap-4">
        <div className="flex w-full justify-between">
          <div className="font-nunito font-medium leading-relaxed text-white">
            Friends List
          </div>
          <div className="font-nunito font-medium leading-relaxed text-primary">
            Manage Contacts
          </div>
        </div>
        <div className="relative flex w-full justify-between">
          {Array.from({
            length: 5,
          }).map((_item, index) => (
            <div
              className="relative inline-flex flex-col items-center justify-center gap-3 rounded-3xl bg-neutral-100 px-[22px] py-4"
              key={index}
            >
              <img
                alt=""
                className="h-16 w-16 rounded-[32px]"
                src="https://via.placeholder.com/64x64"
              />
              <div className="text-center font-nunito text-sm font-normal text-zinc-700">
                Mike <br />
                Townsend
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function InvitesList({
  className,
  invitesList,
  setInvitesList,
}: {
  className?: string;
  invitesList: string[];
  setInvitesList: Dispatch<SetStateAction<string[]>>;
}) {
  const [query, setQuery] = useState("");

  return (
    <Combobox
      multiple
      onChange={(people) => {
        setInvitesList(people);
        setQuery("");
      }}
      value={invitesList}
    >
      <div className={`flex items-center gap-0.5 px-2 py-0.5 ${className}`}>
        {invitesList.map((person) => (
          <span
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-primary-light px-2 py-0.5 font-nunito text-sm"
            key={person}
            onClick={() => {
              setInvitesList((existing) =>
                existing.filter((p) => p !== person),
              );
            }}
          >
            <span>{person}</span>
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
        ))}
        <Combobox.Input
          className="h-full min-h-12 flex-1 border-none bg-white p-0 px-1 text-sm focus:ring-0"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder="Name, @username, email, or phone number"
          value={query}
        />
      </div>
      <div className="absolute mt-1 hidden w-full rounded-md bg-white shadow-lg">
        <Combobox.Options className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
          {query.length > 0 && (
            <Combobox.Option value={query}>
              Add &apos;{query}&apos;
            </Combobox.Option>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
