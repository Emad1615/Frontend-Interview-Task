import { findFolder } from "@/lib/data";
import { ViewFolderList } from "@/components/ViewFolderList";

interface HomeProps {
  searchParam?: {
    filter?: string;
    [key: string]: any;
  };
}

export default function Home({ searchParam }: HomeProps) {
  const folder = findFolder("root");
  const filter = searchParam?.filter ?? "allFiles";
  return (
    <div className="space-y-4">
      <ViewFolderList rootFolder={folder!} filter={filter} />
    </div>
  );
}
