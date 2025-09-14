"use client";

import { INavigationItem } from "@/shared/types";
import { MenuWithBg, NavButtonGroup } from "./ui";

type HeaderProps = {
  items: INavigationItem[];
  title?: string;
  isEditMode?: boolean;
  onSaved?: () => void;
};

export function Header({ items, title, isEditMode, onSaved }: HeaderProps) {
  return (
    <div className="flex flex-col gap-1 justify-between relative w-full h-auto">
      <MenuWithBg title={title} isEditMode={isEditMode} />
      <NavButtonGroup items={items} isEditMode={isEditMode} onSaved={onSaved} />
    </div>
  );
}
