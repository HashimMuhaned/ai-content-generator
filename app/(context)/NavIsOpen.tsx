import { createContext, Dispatch, SetStateAction } from "react";

interface NavIsOpenContextType {
  navIsOpen: boolean;

  setNavIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavIsOpen = createContext<NavIsOpenContextType>({
  navIsOpen: false,

  setNavIsOpen: () => {
    return;
  },
});
