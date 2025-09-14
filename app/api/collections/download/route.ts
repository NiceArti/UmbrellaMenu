import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { getCollectionsPath } from "@/shared/utils/get-collections-path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = getCollectionsPath();
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.stringify(JSON.parse(data), null, 2);

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="collections.json"`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Не удалось скачать файл" },
      { status: 500 }
    );
  }
}
