// api/files/[id]/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findFolder } from "@/lib/data";
import { writeFile, mkdir } from "fs/promises";
import { join, basename, extname } from "path";

export const runtime = "nodejs";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const providedName = formData.get("name")?.toString();
  const parent = findFolder(params.id);

  if (!parent || !file) {
    return NextResponse.json(
      { error: "Invalid request: missing parent or file" },
      { status: 400 }
    );
  }

  const rawName =
    providedName && providedName.trim() ? providedName.trim() : file.name;

  let safeName = basename(rawName);
  const originalExt = extname(file.name);

  if (!extname(safeName) && originalExt) {
    safeName += originalExt;
  }

  if (!safeName) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
  }

  const uploadsDir = join(process.cwd(), "public", "uploads");
  const filePath = join(uploadsDir, safeName);

  try {
    await mkdir(uploadsDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes), { flag: "wx" });
  } catch (err: any) {
    if (err?.code === "EEXIST") {
      return NextResponse.json(
        { error: "File already exists in uploads folder" },
        { status: 409 }
      );
    }
    console.error("Failed to create file in uploads folder:", err);
    return NextResponse.json(
      { error: "Failed to create file" },
      { status: 500 }
    );
  }

  const newFile = {
    id: Date.now().toString(),
    name: safeName,
    type: "file" as const,
    url: `/uploads/${safeName}`,
    // url: `/api/preview/${safeName}`,
  };

  parent.children.push(newFile);

  revalidatePath("/");
  revalidatePath(`/folder/${params.id}`);

  return NextResponse.json(newFile);
}
