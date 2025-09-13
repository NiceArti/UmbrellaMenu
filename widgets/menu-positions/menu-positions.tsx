"use client";

import { Title } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { useMenuEdit } from "./hooks/use-menu-edit";
import { EditToolbar } from "./ui/edit-toolbar";
import { EditableTableView } from "./ui/editable-table-view";
import { PositionsColumns } from "./ui/positions-columns";
import { PositionsTableView } from "./ui/positions-table.view";
import { AddButton } from "../admin/add-button";
import { MenuViewToggle } from "./ui/menu-view-toggle";

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
    onToggleHidden,
    onDelete,
    localIsHidden,
    localTableView,
    setLocalTableView,
    localTag,
    setLocalTag,
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
    isHidden,
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
          isHidden={localIsHidden}
          onToggleHidden={onToggleHidden}
          onDelete={onDelete}
        />
      )}

      <div
        id={localTag || tag}
        className={cn(
          "flex flex-col gap-5 w-full h-auto",
          names.length === 0 || names[0] === "" ? "flex-row" : "flex-col",
          editing && "flex-col"
        )}
      >
        {editing && (
          <MenuViewToggle
            className="justify-end"
            isDisabled={saving}
            isTableView={localTableView}
            onToggleTableView={() => setLocalTableView(true)}
            onToggleColumnView={() => setLocalTableView(false)}
          />
        )}

        {editing && (
          <input
            type="text"
            placeholder="Тег секции"
            className={cn(
              "text-primary text-center font-bold !text-xl border px-2 h-10 bg-transparent w-full"
            )}
            value={localTag}
            onChange={(e) => setLocalTag(e.target.value)}
          />
        )}
        <Title
          title={localTitle}
          isEdit={editing}
          onChangeTitle={(v) => setLocalTitle(v)}
        />
        {localTableView && editing && (
          <EditableTableView
            names={localNames}
            prices={localPrices}
            onChangeNames={setLocalNames}
            onChangePrices={setLocalPrices}
          />
        )}
        {localTableView && !editing && (
          <PositionsTableView names={localNames} prices={localPrices} />
        )}
        {!localTableView && (
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
