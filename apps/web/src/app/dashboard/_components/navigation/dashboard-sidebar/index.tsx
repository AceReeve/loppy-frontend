"use client";
import {
  Home,
  Message,
  Profile2User,
  RouteSquare,
  Setting2,
  VideoOctagon,
  I3DSquare,
  CloudDrizzle,
} from "iconsax-react";
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
      icon: <I3DSquare className="relative size-6" />,
      url: "/help",
      id: 1,
    },
  ];

  const dashboardItems: MenuLinkItem[] = [
    {
      title: "Home",
      icon: <Home className="relative size-6" />,
      url: "",
      id: 0,
    },
    {
      title: "Messages",
      icon: <Message className="relative size-6" />,
      url: "/messages",
      id: 1,
    },
    {
      title: "Contacts",
      icon: <Profile2User className="relative size-6" />,
      url: "/contacts",
      id: 2,
    },
    {
      title: "Marketing",
      icon: <RouteSquare className="relative size-6" />,
      url: "/marketing",
      id: 3,
    },
    {
      title: "Pipelines",
      icon: <VideoOctagon className="relative size-6" />,
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
      title: "Weather",
      icon: <CloudDrizzle className="relative size-6" />,
      url: "/marketing/weather-forecasting",
      id: 6,
    },
    {
      title: "Workflows",
      icon: <VideoOctagon className="relative size-6" />,
      url: "/workflows",
      id: 7,
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
