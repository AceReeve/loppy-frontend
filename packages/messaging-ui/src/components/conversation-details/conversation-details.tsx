"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import { useSelector } from "react-redux";
import * as React from "react";
import { useMessagesState } from "../../providers/messages-provider.tsx";
import ConversationPhoto from "../conversation-photo.tsx";
import ConversationLabel from "../conversation-label.tsx";
import CampaignsDropdown from "./campaigns-dropdown.tsx";
import IntegrationsDropdown from "./integrations-dropdown.tsx";
import TagsDropdown from "./tags-dropdown.tsx";
import NotesDropdown from "./notes-dropdown.tsx";

export default function ConversationDetails() {
  const { sidebarOpen, setSidebarOpen } = useMessagesState();
  const sid = useSelector((state: AppState) => state.currentConversation);
  const participants =
    useSelector((state: AppState) => state.participants)[sid] ?? [];

  return (
    <Transition
      enter="transition ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      show={sidebarOpen}
    >
      <section className="inline-flex w-full max-w-[329px] flex-col items-start justify-start bg-white px-5 pt-6 custom-scrollbar overflow-y-auto">
        <div className="inline-flex w-full items-start justify-between">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-gray-200 group-hover:flex md:flex"
            onClick={() => {
              setSidebarOpen(false);
            }}
            type="button"
          >
            <XMarkIcon className="relative h-5 w-5" />
          </button>
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-gray-200 group-hover:flex md:flex"
            type="button"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/tabler_dots.svg"
            />
          </button>
        </div>
        <div className="inline-flex justify-center gap-4 mt-6">
          <div className="size-12">
            {participants.length > 2 ? (
              <img
                src="/assets/icons/messaging/icon-group.svg"
                alt=""
                className="size-full"
              />
            ) : (
              <ConversationPhoto participants={participants} />
            )}
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="text-xl font-semibold leading-7 text-neutral-800">
              <ConversationLabel participants={participants} />
            </div>
            <div className="inline-flex items-center justify-center gap-3">
              <div className="text-sm font-normal leading-snug text-neutral-400">
                +6284532234651
              </div>
              <div className="flex h-5 w-5 items-center justify-center">
                <div className="relative h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex w-full flex-col items-start justify-start gap-5 border-b border-gray-300 py-3 mt-4">
          <div className="inline-flex w-full items-center justify-between">
            <div className="text-base font-medium leading-normal text-neutral-500">
              Notifications
            </div>
            <div className="relative h-6 w-10 rounded-[30px] bg-sky-300">
              <div className="absolute left-[18px] top-[2px] h-5 w-5 rounded-[30px] bg-white" />
            </div>
          </div>
        </div>
        <CampaignsDropdown />
        <IntegrationsDropdown />
        <TagsDropdown />
        <NotesDropdown />
      </section>
    </Transition>
  );
}
