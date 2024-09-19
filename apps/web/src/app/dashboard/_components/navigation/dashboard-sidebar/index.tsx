"use client";
import { Setting2 } from "iconsax-react";
import { CloudDrizzle } from "lucide-react";
import SidebarHandler from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/sidebar-handler";
import SidebarContent from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/sidebar-content";
import { type MenuItem, type MenuLinkItem } from "@/src/types/types";

interface DashboardSidebarProps {
  className?: string | null;
}
export default function DashboardSidebar(props: DashboardSidebarProps) {
  const bottomItems: MenuLinkItem[] = [
    {
      title: "Settings",
      icon: <Setting2 className="relative size-6" />,
      url: "/settings",
      id: 0,
    },
    {
      title: "Help",
      imageIcon: "/assets/icons/sidebar-icons/icon-help.svg",
      url: "/help",
      id: 1,
    },
  ];

  const dashboardItems: MenuLinkItem[] = [
    {
      title: "Home",
      imageIcon: "/assets/icons/sidebar-icons/icon-home.svg",
      url: "",
      id: 0,
    },
    {
      title: "Messages",
      imageIcon: "/assets/icons/sidebar-icons/icon-messages.svg",
      url: "/messages",
      id: 1,
    },
    {
      title: "Contacts",
      imageIcon: "/assets/icons/sidebar-icons/icon-contacts.svg",
      url: "/contacts",
      id: 2,
    },
    // {
    //   title: "Marketing",
    //   imageIcon: "/assets/icons/sidebar-icons/icon-marketing.svg",
    //   url: "/marketing",
    //   id: 3,
    // },
    {
      title: "Pipelines",
      imageIcon: "/assets/icons/sidebar-icons/icon-pipelines.svg",
      url: "/pipelines",
      id: 4,
    },
    // {
    //   title: "Teams",
    //   icon: <People className="relative size-6" />,
    //   url: "/teams",
    //   id: 5,
    // },

    {
      title: "Workflows",
      imageIcon: "/assets/icons/sidebar-icons/icon-workflows.svg",
      url: "/workflows",
      id: 7,
    },

    {
      title: "Reporting",
      imageIcon: "/assets/icons/sidebar-icons/icon-reporting.svg",
      url: "/reporting",
      id: 8,
    },
    // {
    //   title: "Branding",
    //   icon: <VideoOctagon className="relative size-6" />,
    //   url: "/branding",
    //   id: 9,
    // },
    {
      title: "Weather",
      icon: <CloudDrizzle className="relative size-6" />,
      url: "/weather-forecasting",
      id: 9,
    },
  ];

  const menuItems: MenuItem = {
    title: "Dashboard Menu Items",
    slug: "dashboard",
    id: 0,
    items: [dashboardItems, bottomItems],
    showTitle: false,
  };

  return (
    <SidebarHandler className={props.className}>
      <SidebarContent menuItems={menuItems} />
    </SidebarHandler>
  );
}
