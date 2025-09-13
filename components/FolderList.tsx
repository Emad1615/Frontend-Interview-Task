import Link from "next/link";
import type { FolderNode, FileNode } from "@/lib/data";
import FolderCard from "@/app/_ui/FolderCard";

export function FolderList({
  nodes,
  filter,
  selectedId,
  onSelect,
}: {
  nodes: Array<FolderNode | FileNode>;
  filter?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  if (!nodes.length) {
    return <p className="text-gray-500">(empty)</p>;
  }
  return (
    <ul className="grid [grid-template-columns:repeat(6,minmax(0,1fr))] gap-4">
      {nodes.map((node) => {
        if (node.type === "folder") {
          return (
            <Link href={`/folder/${node.id}`} key={node.id}>
              <FolderCard folder={node} onSelect={onSelect!} />
            </Link>
          );
        }
        return <FolderCard key={node.id} folder={node} onSelect={onSelect!} />;
      })}
    </ul>
  );
}
