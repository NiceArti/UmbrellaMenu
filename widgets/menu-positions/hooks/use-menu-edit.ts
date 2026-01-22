import { useEffect, useState } from "react";

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
  const [localTag, setLocalTag] = useState<string>(tag || "");
  const [localTitle, setLocalTitle] = useState<string>(title || "");
  const [localNames, setLocalNames] = useState<string[]>(names || []);
  const [localPrices, setLocalPrices] = useState<string[]>(prices || []);
  const [localTableView, setLocalTableView] = useState<boolean>(
    tableView || false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [localIsHidden, setLocalIsHidden] = useState<boolean>(!!isHidden);

  useEffect(() => {
    setLocalIsHidden(!!isHidden);
  }, [isHidden]);

  const onEditClick = () => {
    setEditing(true);
    setLocalTag(tag || "");
    setLocalTitle(title || "");
    setLocalNames(names || []);
    setLocalPrices(prices || []);
    setLocalTableView(tableView || false);
    setError(null);
    setSuccess(null);
  };

  const onCancel = () => {
    setEditing(false);
    setLocalTag(tag || "");
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
          prevTag: tag,
          tag: localTag,
          title: localTitle,
          names: localNames,
          prices: localPrices,
          tableView: localTableView,
        }),
      });
      // Safely parse JSON only when it is JSON and body is present
      const ct = res.headers.get("content-type") || "";
      let data: any = null;
      if (ct.includes("application/json")) {
        try { data = await res.json(); } catch {}
      }
      if (!res.ok || (data && data.ok === false)) {
        const text = !data ? await res.text().catch(() => "") : "";
        setError(data?.error || text || "Не удалось сохранить");
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
    const isHidden = !localIsHidden;
    setLocalIsHidden(isHidden);
    setSaving(true);
    try {
      const res = await fetch("/api/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: tag || undefined,
          title,
          isHidden,
        }),
      });
      const ct = res.headers.get("content-type") || "";
      let data: any = null;
      if (ct.includes("application/json")) {
        try { data = await res.json(); } catch {}
      }
      if (!res.ok || (data && data.ok === false)) {
        setLocalIsHidden(!isHidden);
        return;
      }
      onSaved?.();
    } catch {
      setLocalIsHidden(!isHidden);
    } finally {
      setSaving(false);
    }
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
      const ct = res.headers.get("content-type") || "";
      let data: any = null;
      if (ct.includes("application/json")) {
        try { data = await res.json(); } catch {}
      }
      if (!res.ok || (data && data.ok === false)) return;
      onSaved?.();
    } catch {}
  };

  return {
    localIsHidden,
    localTag,
    setLocalTag,
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
