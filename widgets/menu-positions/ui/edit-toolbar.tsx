import { cn } from "@/shared/utils";

export function EditToolbar({
  editing,
  saving,
  onEditClick,
  onCancel,
  onApply,
  className,
  isHidden,
  onToggleHidden,
}: {
  editing: boolean;
  saving: boolean;
  onEditClick: () => void;
  onCancel: () => void;
  onApply: () => void;
  className?: string;
  isHidden?: boolean;
  onToggleHidden?: () => void;
}) {
  return (
    <div
      className={cn("flex justify-end items-center flex-wrap gap-4", className)}
    >
      {typeof isHidden === "boolean" && (
        <button
          className="px-3 py-1 border"
          type="button"
          onClick={onToggleHidden}
          disabled={saving}
          title={isHidden ? "Показать" : "Скрыть"}
        >
          {isHidden ? "👁️ Показать" : "🙈 Скрыть"}
        </button>
      )}
      {!editing ? (
        <button className="px-3 py-1 border" onClick={onEditClick}>
          ✏️ Редактировать
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            className="px-3 py-1 border"
            onClick={onCancel}
            disabled={saving}
          >
            ❌ Отменить
          </button>
          <button
            className="px-3 py-1 border bg-black text-white"
            onClick={onApply}
            disabled={saving}
          >
            {saving ? "Сохранение..." : "✅ Применить"}
          </button>
        </div>
      )}
    </div>
  );
}
