"use client";
import { FolderNode } from "@/lib/data";
import { CreateFolderButton } from "./CreateFolderButton";
import { CreateFileButton } from "./CreateFileButton";
import { FolderList } from "./FolderList";
import BreadCrumb from "./BreadCrumb";

type Props = {
  folder: FolderNode;
};
export default function ViewFolderPage({ folder }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <BreadCrumb />
        <div className="flex gap-1">
          <CreateFolderButton parentId={folder.id} />
          <CreateFileButton parentId={folder.id} />
        </div>
      </div>
      <FolderList nodes={folder.children} />
    </div>
  );
}
