"use client";

import { useBreadCrumbContext } from "@/lib/context/BreadCrumbContext";
import Link from "next/link";
import { IoArrowUndoOutline } from "react-icons/io5";

export default function BreadCrumb() {
  const { links, setLinks } = useBreadCrumbContext();
  const handleClick = (id: string) => {
    setLinks((prev) => {
      const idx = prev.findIndex((link) => link.id === id);
      return idx !== -1 ? prev.slice(0, idx + 1) : prev;
    });
  };
  return (
    <div className="flex gap-1 items-center justify-start my-1 ">
      <IoArrowUndoOutline size={18} className="text-indigo-600" />
      {links.map((link, idx) => (
        <Link
          href={`/folder/${link.id}`}
          key={idx}
          className=" text-gray-500 text-md capitalize font-light italic  hover:text-indigo-500 transition-all duration-150"
          onClick={() => handleClick(link.id)}
        >
          {link.name}
          <span className="inline-block mx-[3px]">/</span>{" "}
        </Link>
      ))}
    </div>
  );
}
