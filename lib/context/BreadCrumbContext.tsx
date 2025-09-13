"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { breadCrumb, findFolder } from "../data";

type BreadCrumbContextProps = {
  links: breadCrumb[];
  setLinks: Dispatch<SetStateAction<breadCrumb[]>>;
};
const BreadCrumbContext = createContext<BreadCrumbContextProps | undefined>(
  undefined
);

type SnackbarProviderProps = {
  children: React.ReactNode;
};
export function BreadCrumbContextProvider({ children }: SnackbarProviderProps) {
  const folder = findFolder("root");

  const [links, setLinks] = useState<breadCrumb[]>([
    { id: folder?.id!, name: folder?.name! },
  ]);

  return (
    <BreadCrumbContext.Provider value={{ links, setLinks }}>
      {children}
    </BreadCrumbContext.Provider>
  );
}
export const useBreadCrumbContext = () => {
  const context = useContext(BreadCrumbContext);
  if (context == null) throw new Error("context used outside provider");
  return context;
};
