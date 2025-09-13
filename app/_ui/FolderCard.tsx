"use client";
import ShowFiles from "@/components/ShowFiles";
import FilePreview from "@/components/ShowFiles";
import { useBreadCrumbContext } from "@/lib/context/BreadCrumbContext";
import { FileNode, FolderNode } from "@/lib/data";
import React, { useState } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { FaFolder, FaMusic } from "react-icons/fa";
import { LuImage } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";
import { CiFileOn } from "react-icons/ci";

type Props = {
  folder: FolderNode | FileNode;
  onSelect: (id: string) => void;
};
export default function FolderCard({ folder, onSelect }: Props) {
  const [openFile, setOpenFile] = useState<boolean>(false);
  const { setLinks } = useBreadCrumbContext();
  return (
    <>
      <div
        className={` cursor-pointer relative flex flex-row items-center justify-start shadow-md w-full h-24 p-4 bg-white rounded-lg lg:h-32 card__item  `}
        onClick={() => {
          if (folder.type === "folder") {
            onSelect?.(folder.id);
            setLinks((prevLink) => [
              ...prevLink,
              { id: folder.id, name: folder.name },
            ]);
          } else setOpenFile(true);
        }}
      >
        <div>
          {folder.type == "folder" ? (
            <FaFolder
              fontSize={50}
              className="card__icon__folder"
              color="#ffd352"
            />
          ) : (
            <CiFileOn fontSize={28} className="text-indigo-500" />
          )}
        </div>
        <div className="flex flex-col items-start justify-center ml-4">
          <h4 className="font-semibold text-sm text-black">{folder.name}</h4>
          <p className="font-normal text-xs text-gray-400 ">{folder.type}</p>
        </div>
      </div>
      {openFile && (
        <ShowFiles
          file={{ name: folder.name, url: folder.url! }}
          open={openFile}
          setOpen={setOpenFile}
        />
      )}
    </>
  );
}
