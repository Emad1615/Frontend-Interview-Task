"use client";

import { useState, Suspense } from "react";
import { CreateFolderButton } from "@/components/CreateFolderButton";
import { CreateFileButton } from "@/components/CreateFileButton";
import { FolderList } from "@/components/FolderList";
import { breadCrumb, FolderNode } from "@/lib/data";
import BreadCrumb from "./BreadCrumb";

interface Props {
  rootFolder: FolderNode;
  filter: string;
}

export function ViewFolderList({ rootFolder, filter }: Props) {
  const [selectedId, setSelectedId] = useState<string>(rootFolder.id);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        {/* <h1 className="text-xl font-bold">{rootFolder.name}</h1> */}
        <BreadCrumb />
        <div className="flex gap-1">
          <CreateFolderButton parentId={selectedId} />
          <CreateFileButton parentId={selectedId} />
        </div>
      </div>

      <Suspense fallback={<></>} key={filter}>
        <FolderList
          nodes={rootFolder.children}
          filter={filter}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </Suspense>
    </div>
  );
}
