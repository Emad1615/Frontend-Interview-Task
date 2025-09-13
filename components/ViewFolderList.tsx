"use client";

import { useState, Suspense } from "react";
import { CreateFolderButton } from "@/components/CreateFolderButton";
import { CreateFileButton } from "@/components/CreateFileButton";
import { FolderList } from "@/components/FolderList";
import { FolderNode } from "@/lib/data";
import BreadCrumb from "./BreadCrumb";
import Spinner from "@/app/_ui/Spinner";

interface Props {
  rootFolder: FolderNode;
  filter: string;
}

export function ViewFolderList({ rootFolder, filter }: Props) {
  const [selectedId, setSelectedId] = useState<string>(rootFolder.id);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <BreadCrumb />
        <div className="flex gap-1">
          <CreateFolderButton parentId={selectedId} />
          <CreateFileButton parentId={selectedId} />
        </div>
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
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
