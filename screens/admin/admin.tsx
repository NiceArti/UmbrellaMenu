"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoginModal } from "@/widgets/login-modal/login-modal";
import { PageLayout } from "@/shared/ui";
import { Header } from "@/widgets/header";
import Hookah from "@/app/Hookah/Hookah";
import { MenuPositions } from "@/widgets/menu-positions/menu-positions";
import { Footer } from "@/widgets/footer";
import { Loader } from "lucide-react";
import { ICollections, IPositionItem } from "@/shared/types";
import Sortable from "sortablejs";
import { CreateMenuSection } from "@/widgets/create-menu-section/create-menu-section";

export function AdminPage({ authenticated }: { authenticated: boolean }) {
  const [collections, setCollections] = useState<ICollections | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localPositions, setLocalPositions] = useState<IPositionItem[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sortableRef = useRef<Sortable | null>(null);
  const latestPositionsRef = useRef<IPositionItem[]>([]);

  const reloadCollections = async () => {
    try {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(data);
      setLocalPositions(data.positions);
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

  // keep latest list for Sortable callbacks
  useEffect(() => {
    latestPositionsRef.current = localPositions;
  }, [localPositions]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (sortableRef.current) {
      sortableRef.current.destroy();
      sortableRef.current = null;
    }
    sortableRef.current = Sortable.create(el, {
      animation: 200,
      handle: ".drag-handle",
      dataIdAttr: "data-id",
      forceFallback: true,
      fallbackOnBody: true,
      fallbackTolerance: 3,
      ghostClass: "drag-ghost-dark",
      chosenClass: "drag-chosen",
      // dragClass: "drag-dragging",
      onEnd: async (evt) => {
        const order = Array.from((evt.to as HTMLElement).children)
          .map((child) => (child as HTMLElement).getAttribute("data-id"))
          .filter(Boolean) as string[];
        const byId = new Map(
          latestPositionsRef.current.map((p) => [String(p.id), p] as const)
        );
        const next = order
          .map((id) => byId.get(String(id)))
          .filter(Boolean) as IPositionItem[];
        if (next.length !== latestPositionsRef.current.length) {
          const missing = latestPositionsRef.current.filter(
            (p) => !next.some((n) => String(n.id) === String(p.id))
          );
          next.push(...missing);
        }
        // Optimistic UI update
        setLocalPositions(next);

        // Persist to server: send full array
        try {
          const sanitized = next.map((p) => ({
            id: p.id,
            tag: p.tag,
            title: p.title,
            isHidden: p.isHidden,
            names: p.names,
            prices: p.prices,
            tableView: p.tableView,
          }));
          const res = await fetch("/api/collections", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ positions: sanitized }),
          });
          if (!res.ok) {
            const text = await res.text().catch(() => "<no body>");
            console.error("[positions] save failed:", res.status, text);
          }
        } catch (e) {
          console.error("Failed to persist positions order", e);
        }
      },
    });

    return () => {
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [localPositions.length]);

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

          <CreateMenuSection onSaved={reloadCollections} />

          <div className="flex flex-col gap-20 w-full px-8" ref={containerRef}>
            {localPositions.map((position) => (
              <div
                key={position.id}
                data-id={position.id}
                className="flex flex-col gap-10 w-full"
              >
                <div className="w-full drag-handle cursor-grab text-sm text-muted-foreground -mb-2 rounded">
                  ⇅ Перетащить секцию
                </div>
                <MenuPositions
                  tag={position.tag ?? ""}
                  title={position.title ?? ""}
                  names={position.names ?? []}
                  prices={position.prices ?? []}
                  tableView={position.tableView ?? false}
                  isHidden={!!position.isHidden}
                  isEditMode={true}
                  onSaved={reloadCollections}
                />
              </div>
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
