import { useState } from "react";
import { Tag } from "@/shared/config/tags";
import { ScrollableButton } from "@/shared/ui";
import { EditToolbar } from "../../menu-positions/ui/edit-toolbar";
import { AddButton } from "@/widgets/admin/add-button";

interface Props {
  items: {
    text: string;
    tag: Tag;
  }[];
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
      const data = await res.json();
      if (!res.ok || !data?.ok) return;
      setEditing(false);
      onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 h-auto relative">
      {isEditMode && (
        <EditToolbar
          className="absolute right-8 -top-10"
          editing={editing}
          saving={saving}
          onEditClick={onEditClick}
          onCancel={onCancel}
          onApply={onApply}
        />
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
                      { text: "", tag: "" as Tag },
                    ]);
                    setTagMode([...tagMode, false]);
                  }}
                />
              </div>
            </>
          ) : (
            items.map((item, index) => (
              <ScrollableButton
                key={index}
                tag={item.tag}
                value={item.text}
                className="grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground bg-primary text-xl w-1/4 rounded-none focus-visible:bg-red-950"
              />
            ))
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
