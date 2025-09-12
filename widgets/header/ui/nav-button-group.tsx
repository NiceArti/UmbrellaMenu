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
            <>
              {localItems.map((item, index) => (
                <input
                  type="text"
                  className="grow h-16 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_25%)] text-primary-foreground text-center bg-primary/70 text-xl w-1/4 rounded-none focus-visible:bg-red-950"
                  value={item.text}
                  onChange={(e) => {
                    const next = [...localItems];
                    next[index] = { ...next[index], text: e.target.value };
                    setLocalItems(next);
                  }}
                />
              ))}

              {/* TODO: add logic here */}
              <AddButton className="text-xl" onClick={() => {}}/>
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
