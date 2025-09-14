import { promises as fs } from "fs";
import { ICollections } from "../types";
import { getCollectionsPath } from "./get-collections-path";

export async function readCollections(): Promise<ICollections> {
  const raw = await fs.readFile(getCollectionsPath(), "utf8");
  const data = JSON.parse(raw);
  return {
    hookah: data.hookah,
    navigation: data.navigation,
    positions: data.positions,
  };
}
