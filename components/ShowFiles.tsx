"use client";

import { Dispatch, SetStateAction } from "react";
import FilePreview from "reactjs-file-preview";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ShowFiles({
  file,
  open,
  setOpen,
}: {
  file: { name: string; url: string };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="bg-white p-4 rounded space-y-2 w-1/2 h-3/4 relative">
            <IoIosCloseCircleOutline
              onClick={() => setOpen(false)}
              className="absolute top-0 right-1 text-red-500 cursor-pointer"
              size={25}
            />
            <FilePreview
              preview={window.location.origin + file.url}
              placeHolderImage="https://example.com/placeholder.png"
              errorImage="https://example.com/error.png"
            />
          </div>
        </div>
      )}
    </>
  );
}
