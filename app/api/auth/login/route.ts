import { NextRequest, NextResponse } from "next/server";
import { isValidPassword, isValidLogin } from "@/shared/utils/auth";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  ADMIN_PASSWORD,
} from "@/shared/constants/constants";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const passwordHash = ADMIN_PASSWORD;
    if (!passwordHash) {
      return NextResponse.json(
        { ok: false, error: "Сервер не настроен" },
        { status: 500 }
      );
    }

    const data = await req.json();
    const login = data.login;
    const password = data.password;

    if (!isValidLogin(login) || !isValidPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "Неправильный логин или пароль" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: passwordHash,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ADMIN_COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Неизвестная ошибка" },
      { status: 500 }
    );
  }
}
