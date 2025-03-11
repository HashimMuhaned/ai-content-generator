"use client";

import React from "react";
import Image from "next/image";
import { Home, FileClock, Settings, MenuSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";
import Link from "next/link";
import { useContext } from "react";
import { NavIsOpen } from "@/app/(context)/NavIsOpen";

const SideNav = () => {
  const listMenu = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: MenuSquare,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  // Use the client-only `usePathname` hook to get the current path
  const urlPath = usePathname();
  const { navIsOpen, setNavIsOpen } = useContext(NavIsOpen);

  return (
    <div className="pt-5 pb-5 pr-2 pl-2 h-screen md:p-5 relative shadow-sm border bg-white">
      {/* Logo */}
      <div className="flex justify-center">
        <Image src={"/logo1.svg"} alt="logo" width={50} height={90} />
      </div>

      {/* Divider */}
      <hr className="my-6 border" />

      {/* Navigation Menu */}
      <div className="mt-3">
        {listMenu.map((menu, index) => (
          <Link
            onClick={() => setNavIsOpen(false)}
            key={index}
            href={menu.path}
            className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg hover:cursor-pointer items-center ${
              urlPath === menu.path ? "bg-primary text-white" : ""
            }`}
          >
            <menu.icon className="w-6 h-6" />
            <h2>{menu.name}</h2>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
};

export default SideNav;
