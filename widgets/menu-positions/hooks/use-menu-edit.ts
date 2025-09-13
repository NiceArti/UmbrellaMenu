import { useState } from "react";

export const useMenuEdit = ({
  tag,
  title,
  names,
  prices,
  tableView,
  onSaved,
  isHidden,
}: {
  tag: string;
  title: string;
  names: string[];
  prices: string[];
  tableView: boolean;
  onSaved?: () => void;
  isHidden?: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState<string>(title || "");
  const [localNames, setLocalNames] = useState<string[]>(names || []);
  const [localPrices, setLocalPrices] = useState<string[]>(prices || []);
  const [localTableView, setLocalTableView] = useState<boolean>(
    tableView || false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onEditClick = () => {
    setEditing(true);
    setLocalTitle(title || "");
    setLocalNames(names || []);
    setLocalPrices(prices || []);
    setLocalTableView(tableView || false);
    setError(null);
    setSuccess(null);
  };

  const onCancel = () => {
    setEditing(false);
    setLocalTitle(title || "");
    setLocalNames(names || []);
    setLocalPrices(prices || []);
    setLocalTableView(tableView || false);
    setError(null);
    setSuccess(null);
  };

  const applyChanges = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag,
          title: localTitle,
          names: localNames,
          prices: localPrices,
          tableView: localTableView,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Не удалось сохранить");
        return;
      }
      setSuccess("Сохранено");
      setEditing(false);
      onSaved?.();
    } catch {
      setError("Сетевая ошибка");
    } finally {
      setSaving(false);
    }
  };

  const onToggleHidden = async () => {
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
  };

  const onDelete = async () => {
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
  };

  return {
    localTitle,
    setLocalTitle,
    localNames,
    setLocalNames,
    localPrices,
    setLocalPrices,
    localTableView,
    setLocalTableView,
    editing,
    saving,
    onEditClick,
    onCancel,
    applyChanges,
    onToggleHidden,
    onDelete,
    error,
    success,
  };
};
