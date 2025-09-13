import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/shared/constants/constants";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "db", "collections.json");
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { navigation: [], positions: [] },
      { status: 200 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const isAuth = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!isAuth) {
      return NextResponse.json(
        { ok: false, error: "Авторизируйтесь" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      tag,
      prevTag,
      title,
      names,
      prices,
      tableView,
      isHidden,
      navigation,
      hookah,
      newPosition,
    } = body || {};

    const filePath = path.join(process.cwd(), "db", "collections.json");
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    if (Array.isArray(navigation)) {
      const sanitized = navigation
        .filter((n: any) => n && typeof n.tag === "string")
        .map((n: any) => ({
          tag: n.tag,
          text: typeof n.text === "string" ? n.text : "",
        }));
      data.navigation = sanitized;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ ok: true, data: sanitized });
    }

    // Create a new position section
    if (newPosition && typeof newPosition === "object") {
      const positions = Array.isArray(data.positions) ? data.positions : [];
      const sanitizedNew = {
        tag:
          typeof newPosition.tag === "string" && newPosition.tag.trim()
            ? newPosition.tag
            : `section-${Date.now()}`,
        title:
          typeof newPosition.title === "string"
            ? newPosition.title
            : "Новая секция",
        isHidden:
          typeof newPosition.isHidden === "boolean"
            ? newPosition.isHidden
            : false,
      } as any;
      if (Array.isArray(newPosition.names))
        sanitizedNew.names = newPosition.names;
      else sanitizedNew.names = [];
      if (Array.isArray(newPosition.prices))
        sanitizedNew.prices = newPosition.prices;
      else sanitizedNew.prices = [];
      sanitizedNew.tableView =
        typeof newPosition.tableView === "boolean"
          ? newPosition.tableView
          : false;

      positions.unshift(sanitizedNew);
      data.positions = positions;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ ok: true, data: sanitizedNew });
    }

    if (hookah && typeof hookah === "object") {
      const sanitized = {
        ...(typeof hookah.title === "string" ? { title: hookah.title } : {}),
        sizes: Array.isArray(hookah.sizes)
          ? hookah.sizes
              .filter((s: any) => s)
              .map((s: any) => ({
                persons: typeof s?.persons === "string" ? s.persons : "",
                price: typeof s?.price === "string" ? s.price : "",
              }))
          : [],
        electronic:
          hookah.electronic && typeof hookah.electronic === "object"
            ? {
                title:
                  typeof hookah.electronic.title === "string"
                    ? hookah.electronic.title
                    : "",
                price:
                  typeof hookah.electronic.price === "string"
                    ? hookah.electronic.price
                    : "",
              }
            : undefined,
        noteLines: Array.isArray(hookah.noteLines)
          ? hookah.noteLines.filter((l: any) => typeof l === "string")
          : [],
      } as any;
      data.hookah = sanitized;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ ok: true, data: sanitized });
    }

    const positions = Array.isArray(data.positions) ? data.positions : [];
    // Deletion flow
    if (body?.deletePosition === true) {
      const delIndex = positions.findIndex(
        (p: any) =>
          (tag && p.tag === tag) || (!tag && title && p.title === title)
      );
      if (delIndex === -1) {
        return NextResponse.json(
          { ok: false, error: "Раздел не найден" },
          { status: 404 }
        );
      }
      positions.splice(delIndex, 1);
      data.positions = positions;
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ ok: true });
    }

    const index = positions.findIndex((p: any) => {
      if (typeof prevTag === "string" && prevTag) return p.tag === prevTag;
      if (typeof tag === "string" && tag) return p.tag === tag;
      if (typeof title === "string" && title) return p.title === title;
      return false;
    });
    if (index === -1) {
      return NextResponse.json(
        { ok: false, error: "Раздел не найден" },
        { status: 404 }
      );
    }

    const current = positions[index];
    const updated = {
      ...current,
      ...(typeof title === "string" ? { title } : {}),
      ...(typeof tableView === "boolean" ? { tableView } : {}),
      ...(typeof isHidden === "boolean" ? { isHidden } : {}),
      ...(Array.isArray(names) ? { names } : {}),
      ...(Array.isArray(prices) ? { prices } : {}),
      ...(typeof tag === "string" && tag.trim() ? { tag } : {}),
    };
    // If tag was changed, also update navigation entries that reference old tag
    if (
      typeof updated.tag === "string" &&
      updated.tag.trim() &&
      current?.tag &&
      updated.tag !== current.tag &&
      Array.isArray(data.navigation)
    ) {
      data.navigation = data.navigation.map((n: any) =>
        n?.tag === current.tag ? { ...n, tag: updated.tag } : n
      );
    }
    positions[index] = updated;
    data.positions = positions;

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ ok: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Ошибка при сохранении" },
      { status: 500 }
    );
  }
}
