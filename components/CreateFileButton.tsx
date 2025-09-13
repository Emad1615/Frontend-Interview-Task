"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateFileButton({ parentId }: { parentId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border px-2 py-1 rounded bg-white"
      >
        + File
      </button>

      {open && (
        <form
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-10"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!file) return;

            const formData = new FormData();
            if (name.trim()) formData.append("name", name.trim());
            formData.append("file", file);

            const res = await fetch(`/api/files/${parentId}`, {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const newFile = await res.json(); // FileNode كامل
              console.log("File created:", newFile);
              router.refresh();
            }

            setOpen(false);
            setName("");
            setFile(null);
          }}
        >
          <div className="bg-white p-4 rounded space-y-2 w-80">
            <input
              type="text"
              placeholder="File name (optional)"
              className="border p-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="border p-1 w-full"
            />

            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="border px-2 py-1 rounded"
                disabled={!file}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setFile(null);
                  setName("");
                }}
                className="border px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
