"use client";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@repo/ui/utils";
import metadata from "@/src/meta/metadata";
import { useDashboardState } from "@/src/providers/dashboard-provider";

interface SidebarHandlerProps {
  children: React.ReactNode;
  className?: string | null;
}
export default function SidebarHandler(props: SidebarHandlerProps) {
  const { sidebarCollapsed: collapsed, toggleSidebar } = useDashboardState();

  return (
    <aside
      className={cn(
        "overflow-x-hidden px-4 transition-all duration-500",
        props.className,
        collapsed ? "w-auto" : "w-[250px]",
      )}
    >
      <div className="bg-light-darker mt-7 flex items-center justify-between gap-4 pr-2">
        {/* <!-- TITLE --> */}
        <Link
          className="z-50 flex items-center gap-2 text-lg font-bold text-primary"
          href="/"
        >
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={138}
            height={141}
            className="size-[65px] w-[65px] object-contain transition-all duration-500"
          />
          <div
            className={`flex-col text-black transition-opacity duration-500 ${collapsed ? "hidden opacity-0" : "opacity-1 flex"}`}
          >
            <div className="flex">
              <span className="font-montserrat text-xl font-bold">
                {metadata.title}
              </span>
              <span className="font-montserrat text-xs font-bold">™</span>
            </div>
            <div className="whitespace-nowrap font-montserrat text-xs font-bold text-opacity-50">
              Your Service Sidekick
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-[33px]">{props.children}</div>

      <button
        className={`absolute bottom-10 right-4 border-2 p-2 text-[#fff] transition-all duration-500 hover:bg-white ${collapsed ? "rotate-180" : ""}`}
        aria-label="Menu"
        onClick={() => {
          toggleSidebar();
        }}
        type="button"
      >
        {/*<Bars2Icon className="w-5 h-5" aria-hidden="true" />*/}
        <ChevronLeftIcon className="h-5 w-5 " aria-hidden="true" />
      </button>
    </aside>
  );
}
