"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { CreditUsageContext } from "../(context)/CreditUsageUpdate";
import { UserHistory } from "../(context)/UserHistory";
import { NavIsOpen } from "../(context)/NavIsOpen";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [totalUsage, setTotalUsage] = useState<any>(0);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>(0);
  const [userHistory, setUserHistory] = useState<any>(0);
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <CreditUsageContext.Provider
        value={{ updateCreditUsage, setUpdateCreditUsage }}
      >
        <UserHistory.Provider value={{ userHistory, setUserHistory }}>
          <NavIsOpen.Provider value={{ navIsOpen, setNavIsOpen }}>
            <div
              className=" h-full"
              onClick={
                navIsOpen
                  ? () => setNavIsOpen(false)
                  : () => {
                      return;
                    }
              }
            >
              <div
                className={`md:w-64 ${
                  navIsOpen ? "" : "hidden"
                } md:block fixed w-[50%] z-50`}
              >
                <SideNav />
              </div>
              <div className="md:ml-64">
                <Header />
                {children}
              </div>
            </div>
          </NavIsOpen.Provider>
        </UserHistory.Provider>
      </CreditUsageContext.Provider>
    </TotalUsageContext.Provider>
  );
};

export default layout;
