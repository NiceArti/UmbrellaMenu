import { NextResponse } from "next/server";
import { readCollections } from "../helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await readCollections(); // { navigation: [], positions: [], ... }
    const jsonData = JSON.stringify(data, null, 2);

    // полезно указать длину файла
    const contentLength = Buffer.byteLength(jsonData, "utf8").toString();

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="collections.json"',
        "Content-Length": contentLength,
        // запретить кеш любых прокси/браузеров
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        Pragma: "no-cache",
        "CDN-Cache-Control": "no-store",
        "Surrogate-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("download error:", e);
    return NextResponse.json(
      { error: "Не удалось скачать файл" },
      { status: 500 }
    );
  }
}
