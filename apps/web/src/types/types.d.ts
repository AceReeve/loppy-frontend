import { type Table } from "@tanstack/react-table";

export interface MenuLinkItem {
  id: number;
  title: string;
  url: string;
  visibility?: { name: string }[];
  isVisible?: boolean;
  children?: MenuLinkItem[];
  icon?: string | React.ReactNode;
  imageIcon?: string;
  collapsible?: boolean;
}

export interface MenuItem {
  id: number;
  title: string;
  slug: string;
  items: MenuLinkItem[][];
  showTitle?: boolean;
}

export interface Page {
  page: number;
  limit: number;
}

export interface PageProps {
  page: number;
  setPage: (page: number) => void;
}

export interface Filter {
  search_key: string;
  status: string;
  sort_dir: "asc" | "desc";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow any for filters
  filter: any;
}

export interface FiltersProps<TData> {
  filters: Filter;
  setFilters: (filter: Filter) => void;
  table: Table<TData>;
}
