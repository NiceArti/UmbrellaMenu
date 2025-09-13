"use client";

import { cn } from "../utils";

type Props = {
  title?: string;
  isEdit?: boolean;
  onChangeTitle?: (v: string) => void;
  className?: string;
};

export function Title({
  title,
  isEdit = false,
  onChangeTitle,
  className,
}: Props) {
  if (isEdit && onChangeTitle) {
    return (
      <input
        type="text"
        placeholder="Название секции"
        className={cn(
          "text-primary text-center font-bold !text-xl border px-2 h-10 bg-transparent w-full",
          className
        )}
        value={title ?? ""}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
    );
  }
  return (
    <h1 className={cn("text-primary font-bold text-3xl", className)}>
      {title ?? "Title"}
    </h1>
  );
}
