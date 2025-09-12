import { cn } from "@/shared/utils";

export function EditToolbar({
  editing,
  saving,
  className,
  isHidden,
  onEditClick,
  onCancel,
  onApply,
  onToggleHidden,
}: {
  editing: boolean;
  saving: boolean;
  className?: string;
  isHidden?: boolean;
  onEditClick?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  onToggleHidden?: () => void;
}) {
  return (
    <div
      className={cn("flex justify-end items-center flex-wrap gap-1", className)}
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
        <div className="flex gap-1">
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
