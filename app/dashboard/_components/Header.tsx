import { UserButton } from "@clerk/nextjs";
import { Search, MenuIcon } from "lucide-react";
import React, { useContext } from "react";
import { NavIsOpen } from "@/app/(context)/NavIsOpen";

const Header = () => {
  const { navIsOpen, setNavIsOpen } = useContext(NavIsOpen);

  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };

  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input type="text" placeholder="Search..." className="outline-none" />
      </div>
      <div className="flex gap-2 items-center">
        <h2 className="hidden md:block bg-primary p-1 rounded-full text-xs text-white px-2">
          🔥Joint Memebership just for $9.99
        </h2>
        <div className="md:hidden" onClick={toggleNav}>
          <MenuIcon />
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
