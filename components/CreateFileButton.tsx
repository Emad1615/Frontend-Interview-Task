"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";

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
              const newFile = await res.json();
              console.log("File created:", newFile);
              router.refresh();
            }

            setOpen(false);
            setName("");
            setFile(null);
          }}
        >
          <div className="bg-white  rounded shadow-lg min-w-96">
            <div className="border-b py-3 bg-gray-100 ">
              <h1 className="text-lg font-semibold text-gray-500 my-1 px-2 ">
                Add File
              </h1>
            </div>
            <div className="px-2 py-4 space-y-3 ">
              <input
                type="text"
                placeholder="File name (optional)"
                className=" w-full bg-gray-100 py-2 px-3  rounded-sm  outline-none focus:outline-none border-b placeholder:text-sm placeholder:font-light"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="
                          block w-full text-sm text-gray-600
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-600 file:text-white
                          hover:file:bg-indigo-700
                          file:cursor-pointer
                        "
              />
              <div className="flex gap-2 items-end justify-end border-t pt-2">
                <button
                  type="submit"
                  className="uppercase text-sm border px-2 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition-none duration-150 flex items-center justify-center gap-1"
                  disabled={!file}
                >
                  <MdOutlineAdd />
                  <span>Create</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFile(null);
                    setName("");
                  }}
                  className="uppercase text-sm border px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-none duration-150 flex items-center justify-center gap-1"
                >
                  <LiaTimesSolid />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
