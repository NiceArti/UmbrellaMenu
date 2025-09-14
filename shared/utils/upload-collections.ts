import { validateCollections } from "./validate-collections";

export async function uploadCollections(
  data: unknown
): Promise<{ ok: boolean; error?: string }> {
  const validation = validateCollections(data);
  if (!validation.ok) {
    return { ok: false, error: "Неверный формат данных" };
  }
  const res = await fetch("/api/collections/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return {
      ok: false,
      error:
        res.status === 400
          ? "Неверный формат данных"
          : "Ошибка, повторите попытку...",
    };
  }
  return { ok: true };
}
