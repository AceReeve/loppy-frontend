"use client";
import { Category, Message2, PresentionChart } from "iconsax-react";
import SidebarHandler from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/sidebar-handler";
import SidebarContent from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/sidebar-content";

interface Props {
  className?: string | null;
}
export default function DashboardSidebar(props: Props) {
  const chatbotItems: MenuLinkItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      id: 0,
    },
    {
      title: "Modify Bot",
      url: "/modify-bot",
      id: 1,
    },
    {
      title: "Test Your Bot",
      url: "/test-you-bot",
      id: 2,
    },
  ];

  const marketingItems: MenuLinkItem[] = [
    {
      title: "Email Templates",
      url: "/email-templates",
      id: 0,
    },
    {
      title: "Call Center",
      url: "/call-center",
      id: 1,
    },
    {
      title: "Weather Forecasting",
      url: "/weather-forecasting",
      id: 2,
    },
  ];

  const dashboardItems: MenuLinkItem[] = [
    {
      title: "Dashboard",
      icon: <Category variant="Bold" className="relative h-7 w-7" />,
      url: "",
      id: 0,
    },
    {
      title: "Performance",
      icon: <PresentionChart variant="Bold" className="relative h-7 w-7" />,
      url: "/performance",
      id: 1,
    },
    {
      title: "Pipelines",
      icon: "/assets/icons/icon-pipelines.png",
      url: "/pipelines",
      id: 2,
    },
    {
      title: "Messages",
      icon: <Message2 variant="Bold" className="relative h-7 w-7" />,
      url: "/messages",
      id: 3,
    },
    {
      title: "Contacts",
      icon: "/assets/icons/icon-contacts.png",
      url: "/contacts",
      id: 4,
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      id: 5,
      children: chatbotItems,
      collapsible: false,
    },
    {
      title: "Marketing",
      url: "/marketing",
      id: 6,
      children: marketingItems,
      collapsible: false,
    },
  ];

  const menuItems: MenuItem = {
    title: "Dashboard Menu Items",
    slug: "dashboard",
    id: 0,
    items: dashboardItems,
    showTitle: false,
  };

  return (
    <SidebarHandler className={props.className}>
      <SidebarContent menuItems={menuItems} />
    </SidebarHandler>
  );
}
