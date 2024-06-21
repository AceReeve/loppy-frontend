"use client";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import metadata from "@/src/meta/metadata";
import { useDashboardState } from "@/src/providers/dashboard-provider";

interface Props {
  children: React.ReactNode;
  className?: string | null;
}
export default function SidebarHandler(props: Props) {
  const { sidebarCollapsed: collapsed, toggleSidebar } = useDashboardState();

  return (
    <aside
        className={`${props.className} overflow-x-hidden px-4 transition-all duration-500 ${collapsed ? "w-[72px]" : "w-[250px]"}`}
      >
        <button
          className={`absolute right-4 top-10 border-2 p-2 text-[#fff] transition-all duration-500 hover:bg-white ${collapsed ? "rotate-180" : ""}`}
          aria-label="Menu"
          onClick={() => { toggleSidebar(); }}
          type="button"
        >
          {/*<Bars2Icon className="w-5 h-5" aria-hidden="true" />*/}
          <ChevronLeftIcon className="h-5 w-5 " aria-hidden="true" />
        </button>

        <div
          className="bg-light-darker mt-[103px] flex items-center justify-between gap-4 pr-2"
        >
          {/* <!-- TITLE --> */}
          <Link
            className="text-primary z-50 flex items-center gap-2 text-lg font-bold"
            href="/"
          >
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={138}
              height={141}
              className={`size-[65px] object-contain transition-all duration-500 ${collapsed ? "w-12" : "w-[65px]"}`}
            />
            <div
              className={`flex flex-col transition-opacity duration-500 ${collapsed ? "opacity-0" : "opacity-1"}`}
            >
              <div className="flex ">
                <span className="font-montserrat text-xl font-bold text-[#fff]">
                  {metadata.title}
                </span>
                <span className="font-montserrat text-xs font-bold text-[#fff]">
                  ™
                </span>
              </div>
              <div className="font-montserrat whitespace-nowrap text-xs font-bold text-[#fff] text-opacity-50">
                Your Service Sidekick
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-[33px]">{props.children}</div>
      </aside>
  );
}
