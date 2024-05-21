type MenuLinkItem = {
  id: number;
  title: string;
  url: string;
  visibility?: { name: string }[];
  isVisible?: boolean;
  children?: MenuLinkItem[];
  icon?: string | React.ReactNode;
  collapsible?: boolean;
};

type MenuItem = {
  id: number;
  title: string;
  slug: string;
  items: MenuLinkItem[];
  showTitle?: boolean;
};
