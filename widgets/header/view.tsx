"use client";

import { MenuWithBg, NavButtonGroup } from "./ui";
import type { Tag } from "@/shared/config/tags";

type HeaderProps = {
  items: { text: string; tag: Tag }[];
  title?: string;
  isEditMode?: boolean;
  onSaved?: () => void;
};

export function Header({ items, title, isEditMode, onSaved }: HeaderProps) {
  return (
    <div className="flex flex-col gap-1 justify-between relative w-full h-auto">
      <MenuWithBg title={title} />
      <NavButtonGroup items={items} isEditMode={isEditMode} onSaved={onSaved} />
    </div>
  );
}
