"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LoginModal } from "@/widgets/login-modal/login-modal";
import { PageLayout } from "@/shared/ui";
import { Header } from "@/widgets/header";
import Hookah from "@/app/Hookah/Hookah";
import { MenuPositions } from "@/widgets/menu-positions/menu-positions";
import { Footer } from "@/widgets/footer";
import { Loader } from "lucide-react";
import { ICollections } from "@/shared/types";
import { EditableTableView } from "@/widgets/menu-positions/ui/editable-table-view";
import { Title } from "@/shared/ui";

export function AdminPage({ authenticated }: { authenticated: boolean }) {
  const [collections, setCollections] = useState<ICollections | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // New section creation state
  const [adding, setAdding] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newHidden, setNewHidden] = useState(false);
  const [newTableView, setNewTableView] = useState(false);
  const [newNames, setNewNames] = useState<string[]>([]);
  const [newPrices, setNewPrices] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  const reloadCollections = async () => {
    try {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(data);
    } catch {}
  };

  useEffect(() => {
    (async () => {
      try {
        await reloadCollections();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleLoginSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div>
      {authenticated ? (
        <PageLayout className="bg-stone-texture gap-24">
          <Header
            items={collections?.navigation || []}
            title="Админка"
            isEditMode={true}
            onSaved={reloadCollections}
          />
          <Hookah
            data={collections?.hookah}
            isEditMode={true}
            onSaved={reloadCollections}
          />
          {/* Add Section action and form */}
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
                  <label className="flex items-center gap-2">
                    <span className="min-w-20 text-sm text-muted-foreground">
                      tag
                    </span>
                    <input
                      className="border px-2 h-10"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="coffee"
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
                  setNames={setNewNames}
                  setPrices={setNewPrices}
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    className="px-3 py-1 border bg-black text-white"
                    disabled={creating}
                    onClick={async () => {
                      try {
                        setCreating(true);
                        const res = await fetch("/api/collections", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            newPosition: {
                              tag: newTag || undefined,
                              title: newTitle || "",
                              isHidden: !!newHidden,
                              names: newNames || [],
                              prices: newPrices || [],
                              tableView: !!newTableView,
                            },
                          }),
                        });
                        const data = await res.json();
                        if (!res.ok || !data?.ok) return;
                        setAdding(false);
                        setNewTag("");
                        setNewTitle("");
                        setNewHidden(false);
                        setNewTableView(false);
                        setNewNames([]);
                        setNewPrices([]);
                        await reloadCollections();
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
          <div className="flex flex-col gap-20 w-full px-8">
            {(collections?.positions || []).map((position, index) => (
              <MenuPositions
                key={(position.tag as string) || position.title || index}
                tag={position.tag ?? ""}
                title={position.title ?? ""}
                names={position.names ?? []}
                prices={position.prices ?? []}
                tableView={position.tableView ?? false}
                isHidden={!!position.isHidden}
                isEditMode={true}
                onSaved={reloadCollections}
              />
            ))}
          </div>
          <Footer />
        </PageLayout>
      ) : (
        <LoginModal onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
