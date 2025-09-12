import { useState } from "react";
import { Tag } from "@/shared/config/tags";
import { ScrollableButton } from "@/shared/ui";
import { EditToolbar } from "../../menu-positions/ui/edit-toolbar";

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

  const onEditClick = () => {
    setEditing(true);
    setLocalItems(items);
  };

  const onCancel = () => {
    setEditing(false);
    setLocalItems(items);
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
          className="absolute right-0 -top-10"
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
            localItems.map((item, index) => (
              <label
                key={item.tag}
                className="flex items-center gap-2 w-full md:w-[calc(25%-0.75rem)]"
              >
                {/* <span className="text-sm text-muted-foreground min-w-20">
                  {item.tag}
                </span> */}
                <input
                  type="text"
                  className="flex-1 h-10 px-2 border text-black"
                  value={localItems[index].text}
                  onChange={(e) => {
                    const next = [...localItems];
                    next[index] = { ...next[index], text: e.target.value };
                    setLocalItems(next);
                  }}
                />
              </label>
            ))
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
