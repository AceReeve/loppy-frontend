"use client";
import { NoSymbolIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentText, MessageRemove } from "iconsax-react";
import { Transition } from "@headlessui/react";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";

export default function ConversationDetails() {
  const { sidebarOpen, setSidebarOpen } = useMessagesState();

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
      <section className="inline-flex w-full max-w-[329px] flex-col items-center justify-start gap-5 bg-white px-5 pt-6">
        <div className="inline-flex w-full items-start justify-between">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white group-hover:flex hover:bg-gray-200 md:flex"
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            <XMarkIcon className="relative h-5 w-5" />
          </button>
          <a
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white group-hover:flex hover:bg-gray-200 md:flex"
            href="#"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/tabler_dots.svg"
            />
          </a>
        </div>
        <div className="inline-flex flex-col items-center justify-center gap-4">
          <div className="size-[142px] rounded-full bg-zinc-300" />

          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="text-xl font-semibold leading-7 text-neutral-800">
              Full Name
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
        <div className="inline-flex h-[496.03px] flex-col items-start justify-start gap-5">
          <div className="h-[0px] w-[289px] border border-zinc-200" />
          <div className="inline-flex h-6 w-[289px] items-center justify-between">
            <div className="text-base font-medium leading-normal text-neutral-500">
              Notifications
            </div>
            <div className="relative h-6 w-10 rounded-[30px] bg-sky-300">
              <div className="absolute left-[18px] top-[2px] h-5 w-5 rounded-[30px] bg-white" />
            </div>
          </div>
          <div className="h-[0px] w-[289px] border border-zinc-200" />
          <div className="h-[0px] w-[289px] border border-zinc-200" />
          <div className="inline-flex w-[289px] items-center justify-between">
            <div className="inline-flex w-[95px] flex-col items-start justify-start gap-0.5">
              <div className="text-base font-medium leading-normal text-neutral-500">
                Recent Files
              </div>
              <div className="self-stretch text-xs font-normal leading-none text-neutral-400">
                5 Files
              </div>
            </div>
            <div className="flex h-6 w-6 items-center justify-center">
              <div className="relative h-6 w-6" />
            </div>
          </div>
          <div className="flex h-[136px] flex-col items-start justify-start gap-3.5 self-stretch font-nunito">
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center justify-start gap-1.5">
                <DocumentText className="relative h-5 w-5 text-neutral-400" />
                <div className="text-base font-normal leading-normal text-neutral-400">
                  Content.pdf
                </div>
              </div>
              <div className="w-[45px] self-stretch text-center text-xs font-normal leading-none text-slate-900">
                20Mb
              </div>
            </div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center justify-start gap-1.5">
                <DocumentText className="relative h-5 w-5 text-neutral-400" />
                <div className="text-base font-normal leading-normal text-neutral-400">
                  Branding.pdf
                </div>
              </div>
              <div className="w-[45px] self-stretch text-center text-xs font-normal leading-none text-slate-900">
                45Mb
              </div>
            </div>
            <div className="inline-flex items-center justify-between self-stretch">
              <div className="flex items-center justify-start gap-1.5">
                <DocumentText className="relative h-5 w-5 text-neutral-400" />
                <div className="text-base font-normal leading-normal text-neutral-400">
                  Design changes.pdf
                </div>
              </div>
              <div className="w-[45px] self-stretch text-center text-xs font-normal leading-none text-slate-900">
                15Mb
              </div>
            </div>
            <button className="text-sm font-medium leading-snug text-sky-300">
              Show more
            </button>
          </div>
          <div className="inline-flex w-[289px] items-center justify-between">
            <div className="inline-flex w-[95px] flex-col items-start justify-start gap-0.5">
              <div className="text-base font-medium leading-normal text-neutral-500">
                Images
              </div>
              <div className="self-stretch text-xs font-normal leading-none text-neutral-400">
                10 Files
              </div>
            </div>
            <div className="flex h-6 w-6 origin-top-left -rotate-90 items-center justify-center">
              <div className="relative h-6 w-6" />
            </div>
          </div>
          <button className="btn-solid-white inline-flex w-[289px] gap-1.5 rounded-[52px] border border-red-500 px-5 py-3">
            <NoSymbolIcon className="relative h-5 w-5" />
            <div className="text-sm font-medium leading-snug text-red-500">
              Block Lincoln
            </div>
          </button>
          <button className="btn-solid-white inline-flex w-[289px] gap-1.5 rounded-[52px] border border-red-500 px-5 py-3">
            <MessageRemove className="relative h-5 w-5" />
            <div className="text-sm font-medium leading-snug text-red-500">
              Block Lincoln
            </div>
          </button>
        </div>
      </section>
    </Transition>
  );
}
