import { findFolder } from "@/lib/data";
import { CreateFolderButton } from "@/components/CreateFolderButton";
import { FolderList } from "@/components/FolderList";
import { CreateFileButton } from "@/components/CreateFileButton";
import ViewFolderPage from "@/components/ViewFolderPage";

interface Props {
  params: { id: string };
}

export default function FolderPage({ params }: Props) {
  const folder = findFolder(params.id);
  if (!folder) {
    return <p>Folder not found</p>;
  }
  return <ViewFolderPage folder={folder} />;
}
// <div className="space-y-4">
//   <div className="flex justify-between items-center">
//     <div className="flex gap-1">
//       <CreateFolderButton parentId={folder.id} />
//       <CreateFileButton parentId={folder.id} />
//     </div>
//   </div>
//   {/* TODO: allow creating files */}
//   <FolderList nodes={folder.children} />
// </div>
