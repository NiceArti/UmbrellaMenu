import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/shared/constants/constants";
import { validateCollections } from "@/shared/utils/validate-collections";
import { saveCollections } from "../helpers";

export async function POST(req: NextRequest) {
  try {
    // auth
    const cookieStore = cookies();
    const isAuth = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!isAuth) {
      return NextResponse.json(
        { ok: false, error: "Авторизируйтесь" },
        { status: 401 }
      );
    }

    // body (ожидаем application/json)
    const body = await req.json();

    // валидация
    const validation = validateCollections(body);
    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, error: validation.message },
        { status: 400 }
      );
    }

    // (опционально) бэкап предыдущей версии
    // const prev = await readData();

    // запись в Redis
    await saveCollections(body);

    return NextResponse.json({ ok: true }, {
      headers: {
        // POST-ответ не кешируем
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  } catch (e) {
    console.error("UPLOAD collections error:", e);
    return NextResponse.json(
      { ok: false, error: "Ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}
