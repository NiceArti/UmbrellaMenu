"use client";

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
        className={
          className ||
          "text-primary font-bold text-3xl border px-2 h-10 bg-transparent w-full"
        }
        value={title ?? ""}
        onChange={(e) => onChangeTitle(e.target.value)}
      />
    );
  }
  return (
    <h1 className={className || "text-primary font-bold text-3xl"}>
      {title ?? "Title"}
    </h1>
  );
}
