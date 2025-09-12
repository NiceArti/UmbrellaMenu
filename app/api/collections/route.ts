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
      title,
      names,
      prices,
      tableView,
      isHidden,
      navigation,
      hookah,
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
    const index = positions.findIndex(
      (p: any) => (tag && p.tag === tag) || (!tag && title && p.title === title)
    );
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
    };
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
