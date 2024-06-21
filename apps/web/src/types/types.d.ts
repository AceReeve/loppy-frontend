interface MenuLinkItem {
  id: number;
  title: string;
  url: string;
  visibility?: { name: string }[];
  isVisible?: boolean;
  children?: MenuLinkItem[];
  icon?: string | React.ReactNode;
  collapsible?: boolean;
}

interface MenuItem {
  id: number;
  title: string;
  slug: string;
  items: MenuLinkItem[];
  showTitle?: boolean;
}
