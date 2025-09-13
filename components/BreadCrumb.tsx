"use client";

import { useBreadCrumbContext } from "@/lib/context/BreadCrumbContext";
import Link from "next/link";
import { IoReturnUpBack } from "react-icons/io5";

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
      <p className="font-bold text-sm text-gray-600">BreadCrumb Nav ➡️</p>
      {links.map((link) => (
        <Link
          href={`/folder/${link.id}`}
          key={link.id}
          className=" text-gray-500 text-md capitalize font-light italic  "
          onClick={() => handleClick(link.id)}
        >
          {link.name}
          <span className="inline-block mx-[3px]">/</span>{" "}
        </Link>
      ))}
    </div>
  );
}
