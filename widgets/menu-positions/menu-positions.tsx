"use client";

import { Title } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { useMenuEdit } from "./hooks/use-menu-edit";
import { EditToolbar } from "./ui/edit-toolbar";
import { EditableTableView } from "./ui/editable-table-view";
import { PositionsColumns } from "./ui/positions-columns";
import { PositionsTableView } from "./ui/positions-table.view";
import { AddButton } from "../admin/add-button";

interface Props {
  title: string;
  names: string[];
  prices: string[];
  tag: string;
  tableView: boolean;
  isHidden?: boolean;
  isEditMode?: boolean;
  onSaved?: () => void;
}

export function MenuPositions({
  title,
  names,
  prices,
  tag,
  tableView,
  isHidden = false,
  isEditMode = false,
  onSaved,
}: Props) {
  const {
    editing,
    saving,
    onEditClick,
    onCancel,
    applyChanges,
    localTableView,
    setLocalTableView,
    localTitle,
    setLocalTitle,
    localNames,
    setLocalNames,
    localPrices,
    setLocalPrices,
  } = useMenuEdit({
    tag,
    title,
    names,
    prices,
    tableView,
    onSaved,
  });

  return (
    <>
      {isEditMode && (
        <EditToolbar
          editing={editing}
          saving={saving}
          onEditClick={onEditClick}
          onCancel={onCancel}
          onApply={applyChanges}
          isHidden={isHidden}
          onToggleHidden={async () => {
            try {
              const res = await fetch("/api/collections", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tag: tag || undefined,
                  title,
                  isHidden: !isHidden,
                }),
              });
              const data = await res.json();
              if (!res.ok || !data?.ok) return;
              onSaved?.();
            } catch {}
          }}
          onDelete={async () => {
            try {
              const res = await fetch("/api/collections", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  tag: tag || undefined,
                  title,
                  deletePosition: true,
                }),
              });
              const data = await res.json?.();
              if (!res.ok || (data && data.ok === false)) return;
              onSaved?.();
            } catch {}
          }}
        />
      )}
      <div
        id={tag}
        className={cn(
          "flex flex-col gap-5 w-full h-auto",
          names.length === 0 || names[0] === "" ? "flex-row" : "flex-col"
        )}
      >
        <div className="flex justify-between w-full gap-2">
          <Title
            title={localTitle}
            isEdit={editing}
            onChangeTitle={(v) => setLocalTitle(v)}
          />
          {editing && (
            <div className="flex gap-1">
              <button
                type="button"
                disabled={saving}
                onClick={() => setLocalTableView(true)}
                className={cn(
                  "px-3 py-1 border",
                  localTableView && "bg-black text-white"
                )}
              >
                Таблица
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setLocalTableView(false)}
                className={cn(
                  "px-3 py-1 border",
                  localTableView && "bg-black text-white"
                )}
              >
                Колонки
              </button>
            </div>
          )}
        </div>
        {localTableView ? (
          editing ? (
            <EditableTableView
              names={localNames}
              prices={localPrices}
              setNames={setLocalNames}
              setPrices={setLocalPrices}
            />
          ) : (
            <PositionsTableView names={localNames} prices={localPrices} />
          )
        ) : (
          <PositionsColumns
            editable={editing}
            names={localNames}
            prices={localPrices}
            onChangeName={(i, v) => {
              const next = [...localNames];
              next[i] = v;
              setLocalNames(next);
            }}
            onChangePrice={(i, v) => {
              const next = [...localPrices];
              next[i] = v;
              setLocalPrices(next);
            }}
            onRemove={(i) => {
              const nextNames = localNames.filter((_, idx) => idx !== i);
              const nextPrices = localPrices.filter((_, idx) => idx !== i);
              setLocalNames(nextNames);
              setLocalPrices(nextPrices);
            }}
          />
        )}
        {editing && !localTableView && (
          <div>
            <AddButton
              onClick={() => {
                setLocalNames([...(localNames || []), ""]);
                setLocalPrices([...(localPrices || []), ""]);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
