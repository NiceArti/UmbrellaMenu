import { useRef, useState } from "react";
import { Tag } from "@/shared/config/tags";
import { ScrollableButton } from "@/shared/ui";
import { EditToolbar } from "../../menu-positions/ui/edit-toolbar";
import { AddButton } from "@/widgets/admin/add-button";
import type { INavigationItem } from "@/shared/types";
import { ReactSortable } from "react-sortablejs";
import { cn } from "@/shared/utils";

interface Props {
  items: INavigationItem[];
  isEditMode?: boolean;
  onSaved?: () => void;
}

export function NavButtonGroup({ items, isEditMode = false, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localItems, setLocalItems] = useState(items);
  const [tagMode, setTagMode] = useState<boolean[]>(() =>
    (items || []).map(() => false)
  );
  const [isSortable, setIsSortable] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const latestListRef = useRef<INavigationItem[]>(localItems);

  const onEditClick = () => {
    setEditing(true);
    setLocalItems(items);
    setTagMode((items || []).map(() => false));
  };

  const onCancel = () => {
    setEditing(false);
    setLocalItems(items);
    setTagMode((items || []).map(() => false));
  };

  const onApply = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navigation: localItems }),
      });
      const ct = res.headers.get("content-type") || "";
      let data: unknown = null;
      if (ct.includes("application/json")) {
        try {
          data = await res.json();
        } catch {}
      }
      if (!res.ok || (data && (data as { ok: boolean }).ok === false)) {
        // Optional: read text for debugging
        // const text = !data ? await res.text().catch(() => "") : "";
        return;
      }
      setEditing(false);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 h-auto relative">
      {isEditMode && (
        <>
          <EditToolbar
            className="absolute right-8 -top-10"
            editing={editing}
            saving={saving}
            onEditClick={onEditClick}
            onCancel={onCancel}
            onApply={onApply}
          />
          <button
            type="button"
            className={cn("mx-2 px-3 py-1 border", editing && "hidden")}
            onClick={() => setIsSortable(!isSortable)}
            disabled={savingOrder}
          >
            {savingOrder
              ? "Применяется сортировка"
              : isSortable
              ? "Отключить сортировку"
              : "Включить сортировку"}
          </button>
        </>
      )}
      <div className="flex flex-wrap w-full gap-1 h-auto">
        {items && items.length ? (
          editing ? (
            <>
              {localItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full px-4"
                >
                  <input
                    type="text"
                    className="grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground text-center bg-primary/70 text-xl w-56 rounded-none focus-visible:bg-red-950"
                    value={tagMode[index] ? (item.tag as string) : item.text}
                    onChange={(e) => {
                      const next = [...localItems];
                      if (tagMode[index]) {
                        next[index] = {
                          ...next[index],
                          tag: e.target.value as Tag,
                        };
                      } else {
                        next[index] = { ...next[index], text: e.target.value };
                      }
                      setLocalItems(next);
                    }}
                    placeholder={
                      tagMode[index] ? "Название тега" : "Название ссылки"
                    }
                  />
                  <label className="flex items-center gap-1 text-xl whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={!!tagMode[index]}
                      onChange={(e) => {
                        const next = [...tagMode];
                        next[index] = e.target.checked;
                        setTagMode(next);
                      }}
                    />
                    tag
                  </label>
                  <button
                    type="button"
                    className="px-2 py-1 border text-sm"
                    title="Удалить ссылку"
                    onClick={() => {
                      const next = localItems.filter((_, i) => i !== index);
                      const nextMode = tagMode.filter((_, i) => i !== index);
                      setLocalItems(next);
                      setTagMode(nextMode);
                    }}
                  >
                    ✖
                  </button>
                </div>
              ))}

              <div className="px-4 mx-auto mt-4">
                <AddButton
                  title="Добавить ссылку"
                  className="text-xl w-full"
                  onClick={() => {
                    setLocalItems([
                      ...localItems,
                      { id: localItems.length + 1, text: "", tag: "" as Tag },
                    ]);
                    setTagMode([...tagMode, false]);
                  }}
                />
              </div>
            </>
          ) : (
            <ReactSortable
              disabled={!isSortable || savingOrder}
              touchStartThreshold={8}
              className="flex flex-wrap w-full gap-1 h-auto"
              list={localItems}
              setList={(next) => {
                const reordered = next.map((n, i) => ({ ...n, id: i + 1 }));
                setLocalItems(reordered);
                latestListRef.current = reordered;
              }}
              onEnd={async () => {
                setSavingOrder(true);
                try {
                  const current = latestListRef.current;
                  const sanitized = current.map((n) => ({
                    id: n.id,
                    tag: n.tag,
                    text: n.text,
                  }));
                  const res = await fetch("/api/collections", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ navigation: sanitized }),
                  });
                  const ct = res.headers.get("content-type") || "";
                  let data: any = null;
                  if (ct.includes("application/json")) {
                    try {
                      data = await res.json();
                    } catch {}
                  }
                  // No hard failure on non-JSON/empty body
                } catch (e) {
                  console.error("Failed to persist navigation order", e);
                } finally {
                  setSavingOrder(false);
                }
              }}
              animation={150}
            >
              {localItems.map((item) => (
                <ScrollableButton
                  key={item.id + item.tag}
                  tag={item.tag}
                  value={item.text}
                  className="grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl w-1/4 rounded-none focus-visible:bg-red-950"
                />
              ))}
            </ReactSortable>
          )
        ) : (
          <span
            className="inline-flex grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl w-full justify-center items-center"
            id="menu"
          >
            Меню
          </span>
        )}
      </div>
    </div>
  );
}
