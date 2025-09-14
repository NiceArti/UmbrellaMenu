import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readCollections, saveCollections } from "./helpers";


const ADMIN_COOKIE_NAME = 'admin_auth';

export async function GET() {
  try {
    const data = await readCollections();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        "Pragma": "no-cache",
        "CDN-Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("GET collections error:", e);
    return new NextResponse(JSON.stringify({ navigation: [], positions: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        "Pragma": "no-cache",
        "CDN-Cache-Control": "no-store",
      },
    });
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
      positions: positionsPayload,
    } = body || {};

    const data = await readCollections();

    if (Array.isArray(navigation)) {
      const sanitized = navigation
        .filter((n: any) => n && typeof n.tag === "string")
        .map((n: any) => ({
          tag: n.tag,
          text: typeof n.text === "string" ? n.text : "",
        }));
      data.navigation = sanitized;
      await saveCollections(data);
      return NextResponse.json({ ok: true, data: sanitized });
    }

    // Reorder the entire positions array
    if (Array.isArray(positionsPayload)) {
      const sanitized = positionsPayload
        .filter((p: any) => p)
        .map((p: any, i: number) => ({
          id: typeof p.id === "number" ? p.id : i + 1,
          ...(typeof p.tag === "string" ? { tag: p.tag } : {}),
          ...(typeof p.title === "string" ? { title: p.title } : {}),
          ...(typeof p.isHidden === "boolean" ? { isHidden: p.isHidden } : {}),
          names: Array.isArray(p.names) ? p.names : [],
          prices: Array.isArray(p.prices) ? p.prices : [],
          ...(typeof p.tableView === "boolean"
            ? { tableView: p.tableView }
            : {}),
        }));
      data.positions = sanitized;
      await saveCollections(data);
      return NextResponse.json({ ok: true, data: sanitized });
    }

    // Create a new position section
    if (newPosition && typeof newPosition === "object") {
      const positions = Array.isArray(data.positions) ? data.positions : [];
      const nextId = positions.length + 1;
      const sanitizedNew = {
        id: nextId,
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
      await saveCollections(data);
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
      await saveCollections(data);
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
      await saveCollections(data);
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

    await saveCollections(data);

    return NextResponse.json({ ok: true, data: updated });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Ошибка при сохранении" },
      { status: 500 }
    );
  }
}
