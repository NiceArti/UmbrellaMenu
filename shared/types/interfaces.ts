import { Tag } from "../config/tags";

export interface INavigationItem {
  id: number;
  text: string;
  tag: Tag;
}
export interface IPositionItem {
  id: number;
  tag?: Tag;
  title?: string;
  isHidden?: boolean;
  names?: string[];
  prices?: string[];
  tableView?: boolean;
}

export interface IHookahData {
  title?: string;
  sizes?: { persons?: string; price?: string }[];
  electronic?: { title?: string; price?: string };
  noteLines?: string[];
}

export interface ICollections {
  navigation: INavigationItem[];
  positions: IPositionItem[];
  hookah?: IHookahData;
}
