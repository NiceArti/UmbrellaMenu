import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/shared/constants/constants";
import { getCollectionsPath } from "@/shared/utils/get-collections-path";
import { validateCollections } from "@/shared/utils/validate-collections";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
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

    const validation = validateCollections(body);
    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, error: validation.message },
        { status: 400 }
      );
    }

    const filePath = getCollectionsPath();
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}
