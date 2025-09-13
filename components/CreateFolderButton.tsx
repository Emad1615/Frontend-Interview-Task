"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineAdd } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";

export function CreateFolderButton({ parentId }: { parentId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border px-2 py-1 rounded bg-white"
      >
        + Folder
      </button>
      {open && (
        <form
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-10 "
          onSubmit={async (e) => {
            e.preventDefault();
            const trimmed = name.trim();
            if (trimmed) {
              await fetch(`/api/folders/${parentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: trimmed }),
              });
              router.refresh();
            }
            setOpen(false);
            setName("");
          }}
        >
          <div className="bg-white space-y-2 shadow-lg min-w-96 ">
            <div className="border-b py-3 bg-gray-100 ">
              <h1 className="text-lg font-semibold text-gray-500 my-1 px-2 ">
                Add Folder
              </h1>
            </div>
            <div className="px-2 py-4 space-y-3 ">
              <input
                autoFocus
                placeholder="Folder name"
                name="name"
                className=" w-full bg-gray-100 py-2 px-3  rounded-sm  outline-none focus:outline-none border-b placeholder:text-sm placeholder:font-light"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2 items-end justify-end border-t pt-2">
                <button
                  type="submit"
                  className="uppercase text-sm border px-2 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition-none duration-150 flex items-center justify-center gap-1"
                >
                  <MdOutlineAdd />
                  <span>Create</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
