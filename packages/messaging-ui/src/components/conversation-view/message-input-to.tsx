"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import * as z from "zod";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useGetContactsQuery } from "@/src/endpoints/contacts.ts";

const SendInviteSingleItemSchema = z
  .string()
  .min(1, {
    message: "Email is required",
  })
  .email({
    message: "Email is invalid",
  });

export default function MessageInputTo({
  className,
  contacts,
  setContacts,
}: {
  className?: string;
  contacts: string[];
  setContacts: Dispatch<SetStateAction<string[]>>;
}) {
  const [query, setQuery] = useState("");

  const { data: contactsList } = useGetContactsQuery({
    skip: 0,
    search_key: query,
  });

  return (
    <div className="relative w-full">
      <Combobox
        immediate
        multiple
        onChange={(people) => {
          setContacts(people);
          setQuery("");
        }}
        onClose={() => {
          setQuery("");
        }}
        value={contacts}
      >
        <div className={`flex items-center gap-0.5 py-0.5 ${className}`}>
          {contacts.map((person) => (
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-primary-light px-2 py-0.5 font-nunito text-sm"
              key={person}
              onClick={() => {
                setContacts((existing) => existing.filter((p) => p !== person));
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
            </button>
          ))}
          <ComboboxInput
            autoComplete="off"
            className="h-full min-h-12 flex-1 border-none bg-white p-0 px-2 text-sm focus:ring-0 shadow-none"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="Email, name, or phone number"
            value={query}
          />
        </div>
        {(contactsList?.data ?? []).length > 0 ? (
          <div className="w-full rounded-md bg-white shadow-lg">
            <ComboboxOptions className="shadow-xs max-h-60 overflow-auto rounded-md text-base leading-6 focus:outline-none sm:text-sm sm:leading-5 p-2">
              {contactsList?.data.map((contact) => (
                <ComboboxOption
                  className="group flex gap-2 bg-white items-center data-[focus]:bg-primary-light rounded-md p-1.5"
                  key={contact._id}
                  value={contact.email}
                >
                  <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
                  {contact.first_name} {contact.last_name}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        ) : null}

        {SendInviteSingleItemSchema.safeParse(query).success ? (
          <div className="absolute -bottom-10 w-full rounded-md bg-white shadow-lg">
            <ComboboxOptions className="shadow-xs max-h-60 overflow-auto rounded-md text-base leading-6 focus:outline-none sm:text-sm sm:leading-5 p-2">
              <ComboboxOption value={query}>
                Insert &apos;{query}&apos;
              </ComboboxOption>
            </ComboboxOptions>
          </div>
        ) : null}
      </Combobox>
    </div>
  );
}
