import { NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";
import mime from "mime";
export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filePath = join(process.cwd(), "public", "uploads", params.filename);

    const fileBuffer = await readFile(filePath);

    const contentType =
      mime.getType(params.filename) || "application/octet-stream";

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${params.filename}"`,
      },
    });
  } catch (err) {
    console.error("Preview error:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
