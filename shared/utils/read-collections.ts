import { promises as fs } from "fs";
import path from "path";
import { ICollections } from "../types";

const collectionsPath = path.join(process.cwd(), "db", "collections.json");

export async function readCollections(): Promise<ICollections> {
  const raw = await fs.readFile(collectionsPath, "utf8");
  const data = JSON.parse(raw);
  return {
    hookah: data.hookah,
    navigation: data.navigation,
    positions: data.positions,
  };
}
