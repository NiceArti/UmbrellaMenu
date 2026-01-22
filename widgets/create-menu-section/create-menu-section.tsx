import { useCreateSection } from "@/screens/admin/hooks/use-create-section";
import { Title } from "@/shared/ui";
import { EditableTableView } from "../menu-positions/ui/editable-table-view";

export function CreateMenuSection({ onSaved }: { onSaved: () => void }) {
  const {
    adding,
    setAdding,
    newTag,
    setNewTag,
    newTitle,
    setNewTitle,
    newHidden,
    setNewHidden,
    newTableView,
    setNewTableView,
    newNames,
    setNewNames,
    newPrices,
    setNewPrices,
    creating,
    setCreating,
  } = useCreateSection();

  return (
    <div className="w-full px-8">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="px-3 py-1 border"
          onClick={() => setAdding((v) => !v)}
        >
          {adding ? "✖ Отмена" : "➕ Добавить секцию"}
        </button>
      </div>
      {adding && (
        <div className="border p-3 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex flex-col items-center gap-2 w-full">
              <input
                className="text-primary text-center font-bold !text-xl border px-2 h-10 bg-transparent w-full"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Название тега"
              />
            </label>
            <Title
              title={newTitle}
              isEdit={true}
              onChangeTitle={(v) => setNewTitle(v)}
              className="text-primary font-bold text-3xl border px-2 h-10 bg-transparent"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newHidden}
                onChange={(e) => setNewHidden(e.target.checked)}
              />
              <span className="text-sm">Скрыть (isHidden)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newTableView}
                onChange={(e) => setNewTableView(e.target.checked)}
              />
              <span className="text-sm">Табличный вид</span>
            </label>
          </div>
          <EditableTableView
            names={newNames}
            prices={newPrices}
            onChangeNames={setNewNames}
            onChangePrices={setNewPrices}
          />
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-3 py-1 border bg-black text-white"
              disabled={creating}
              onClick={async () => {
                try {
                  setCreating(true);
                  const collections = await fetch("/api/collections", {
                    method: "GET",
                    cache: "no-store",
                  });
                  const collectionsData = await collections.json();
                  const nextId = collectionsData.positions.length + 1;
                  const res = await fetch("/api/collections", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      newPosition: {
                        id: nextId,
                        tag: newTag || undefined,
                        title: newTitle || "",
                        isHidden: !!newHidden,
                        names: newNames || [],
                        prices: newPrices || [],
                        tableView: !!newTableView,
                      },
                    }),
                  });
                  const ct = res.headers.get("content-type") || "";
                  let data: any = null;
                  if (ct.includes("application/json")) {
                    try { data = await res.json(); } catch {}
                  }
                  if (!res.ok || (data && data.ok === false)) return;
                  setAdding(false);
                  setNewTag("");
                  setNewTitle("");
                  setNewHidden(false);
                  setNewTableView(false);
                  setNewNames([]);
                  setNewPrices([]);
                  onSaved();
                } finally {
                  setCreating(false);
                }
              }}
            >
              {creating ? "Создание..." : "Создать секцию"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
