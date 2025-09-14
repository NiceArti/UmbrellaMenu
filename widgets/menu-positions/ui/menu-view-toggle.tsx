import { cn } from "@/shared/utils";

export function MenuViewToggle({
  isDisabled,
  isTableView,
  onToggleTableView,
  onToggleColumnView,
  className,
}: {
  isDisabled: boolean;
  isTableView: boolean;
  onToggleTableView: () => void;
  onToggleColumnView: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      <button
        type="button"
        disabled={isDisabled}
        onClick={onToggleTableView}
        className={cn(
          "px-3 py-1 border",
          isTableView && "bg-red-900 text-white"
        )}
      >
        Таблица
      </button>
      <button
        type="button"
        disabled={isDisabled}
        onClick={onToggleColumnView}
        className={cn(
          "px-3 py-1 border",
          !isTableView && "bg-red-900 text-white"
        )}
      >
        Колонки
      </button>
    </div>
  );
}
