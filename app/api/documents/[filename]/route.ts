import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
};

type RouteContext = {
  params: Promise<{ filename: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { filename } = await context.params;
  const safeName = path.basename(filename);
  const filePath = path.join(process.cwd(), "documents", safeName);
  const ext = path.extname(safeName).toLowerCase();
  const contentType = MIME_TYPES[ext] ?? "application/octet-stream";
  const download = request.nextUrl.searchParams.get("download") === "1";

  try {
    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": download
          ? `attachment; filename="${safeName}"`
          : `inline; filename="${safeName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
