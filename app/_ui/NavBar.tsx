"use client";

import {
  AiOutlineFolder,
  AiOutlineCloud,
  AiOutlineHome,
  AiFillFolder,
  AiFillCloud,
  AiFillHome,
} from "react-icons/ai";
import { VscRootFolder } from "react-icons/vsc";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="flex relative flex-row items-center justify-around w-full h-full lg:flex-col lg:justify-start bg-gray-100">
      <Link href={"/"} aria-label="go to folders page" className="lg:my-4">
        {pathname !== "/" ? (
          <AiOutlineFolder fontSize={24}></AiOutlineFolder>
        ) : null}
        {pathname === "/" ? (
          <AiFillFolder fontSize={24} fill={"#8357fe"}></AiFillFolder>
        ) : null}
      </Link>
      <Link href={"/cloud"} aria-label="go to cloud page" className="lg:my-4">
        {pathname !== "/cloud" ? (
          <AiOutlineCloud fontSize={24}></AiOutlineCloud>
        ) : null}
        {pathname === "/cloud" ? (
          <AiFillCloud fontSize={24} fill={"#8357fe"}></AiFillCloud>
        ) : null}
      </Link>
      <Link
        href={`/folder/root`}
        aria-label="go to folder root page"
        className="lg:my-4"
      >
        {!pathname.includes("/folder/") ? (
          <VscRootFolder fontSize={24}></VscRootFolder>
        ) : null}
        {pathname.includes("/folder/") ? (
          <VscRootFolder fontSize={24} fill={"#8357fe"}></VscRootFolder>
        ) : null}
      </Link>
    </nav>
  );
};
