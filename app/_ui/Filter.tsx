"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Filter() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParam.get("filter") ?? "allFiles";
  const handelFilter = (filter: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("filter", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex flex-row  items-center justify-start gap-1 border p-1 rounded-sm shadow-sm ">
      <button
        onClick={() => handelFilter("allFiles")}
        className={`flex-grow text-gray-50 px-4 py-1 rounded-sm shadow-lg text-sm uppercase border-indigo-500  hover:bg-indigo-800 transition-all duration-200  ${
          activeFilter == "allFiles" ? "bg-indigo-600" : "bg-indigo-400"
        }`}
      >
        My files
      </button>
      <button
        onClick={() => handelFilter("recent")}
        className={` flex-grow text-gray-50 px-4 py-1 rounded-sm shadow-lg text-sm uppercase border-indigo-500 hover:bg-indigo-800 transition-all duration-200   ${
          activeFilter == "recent" ? "bg-indigo-600" : "bg-indigo-400"
        }`}
      >
        Recent
      </button>
    </div>
  );
}
