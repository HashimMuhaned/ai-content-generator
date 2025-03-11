import { Button } from "@/components/ui/button";
import { db } from "@/utils/PostgressDB";
import { AIoutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { eq } from "drizzle-orm";
import { useContext } from "react";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { CreditUsageContext } from "@/app/(context)/CreditUsageUpdate";

const UsageTrack = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } =
    useContext(CreditUsageContext);

  useEffect(() => {
    user && getData();
  }, [user]);

  useEffect(() => {
    user && getData();
  }, [updateCreditUsage]);

  const getData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      // Handle the case where email might be undefined
      throw new Error("User email address is undefined.");
    }
    const result =
      (await db.select().from(AIoutput).where(eq(AIoutput.createdBy, email))) ||
      [];

    getTotalUsage(result);
  };

  const getTotalUsage = (result: any) => {
    let total: number = 0;

    result.forEach((element: any) => {
      total += total + Number(element.aiResponse?.length);
    });

    setTotalUsage(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: (totalUsage / 100000) * 100 }}
          ></div>
        </div>
        <h2 className="text-sm m-1">{totalUsage}/100,000 credits used</h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
