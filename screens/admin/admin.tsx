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

export function AdminPage({ authenticated }: { authenticated: boolean }) {
  const [collections, setCollections] = useState<ICollections | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
          <div className="flex flex-col gap-20 w-full px-8">
            {(collections?.positions || []).map((position, index) => (
              <MenuPositions
                key={index}
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
