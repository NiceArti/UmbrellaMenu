import { cn } from "@/shared/utils";
import { Loader } from "lucide-react";

export function EditToolbar({
  editing,
  saving,
  onEditClick,
  onCancel,
  onApply,
  className,
  isHidden,
  onToggleHidden,
  onDelete,
}: {
  editing: boolean;
  saving: boolean;
  onEditClick: () => void;
  onCancel: () => void;
  onApply: () => void;
  className?: string;
  isHidden?: boolean;
  onToggleHidden?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className={cn("flex justify-end items-center gap-4", className)}>
      {isHidden !== undefined && !editing && (
        <button
          className="px-3 py-1 border"
          type="button"
          onClick={onToggleHidden}
          disabled={saving}
          title={isHidden ? "Показать" : "Скрыть"}
        >
          {saving ? (
            <span className="flex flex-row items-center justify-center gap-2 !text-sm flex-wrap">
              <Loader className="animate-spin" size={20} /> Загрузка
            </span>
          ) : isHidden ? (
            "👁️ Показать"
          ) : (
            "🙈 Скрыть"
          )}
        </button>
      )}

      {!editing ? (
        <div className="flex gap-3">
          <button className="px-3 py-1 border" onClick={onEditClick}>
            ✏️ Изменить
          </button>
          {onDelete && (
            <button
              className="px-3 py-1 border text-red-700"
              onClick={onDelete}
              disabled={saving}
              title="Удалить секцию"
            >
              🗑️ Удалить
            </button>
          )}
        </div>
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
