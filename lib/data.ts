export type FileNode = {
  id: string;
  name: string;
  type: "file";
  url: string;
};
type FolderType = "folder" | "documents" | "images" | "videos" | "music";

export type FolderNode = {
  id: string;
  name: string;
  type: "folder" | FolderType;
  children: Array<FolderNode | FileNode>;
  url?: string;
};

export const root: FolderNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    { id: "folder-1", name: "Documents", type: "folder", children: [] },
    { id: "folder-2", name: "Photos", type: "folder", children: [] },
  ],
};

export function findFolder(
  id: string,
  current: FolderNode = root
): FolderNode | null {
  if (current.id === id) return current;
  for (const child of current.children) {
    if (child.type === "folder") {
      const result = findFolder(id, child);
      if (result) return result;
    }
  }
  return null;
}
export type breadCrumb = {
  id: string;
  name: string;
};

export const getLastSegment = (path: string) => {
  return path.split("/").pop() ?? "root";
};
