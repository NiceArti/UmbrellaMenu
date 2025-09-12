import Hookah from "../app/Hookah/Hookah";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { PageLayout } from "@/shared/ui";
import { MenuPositions } from "@/widgets/menu-positions/menu-positions";
import { readCollections } from "@/shared/utils/read-collections";

export async function HomePage() {
  const collections = await readCollections();
  const navItems = collections.navigation || [];
  const positions = (collections.positions || []).filter((p) => !p.isHidden);
  return (
    <PageLayout className="bg-stone-texture gap-24">
      <Header items={navItems} />
      <Hookah data={collections.hookah} />
      <div className="flex flex-col gap-20 w-full px-8">
        {positions.map((position, index) => (
          <MenuPositions
            key={index}
            tag={position.tag ?? ""}
            title={position.title ?? ""}
            names={position.names ?? []}
            prices={position.prices ?? []}
            tableView={position.tableView ?? false}
          />
        ))}
      </div>
      <Footer />
    </PageLayout>
  );
}
