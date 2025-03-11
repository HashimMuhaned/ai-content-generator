"use client";

import Templates from "@/app/(data)/Templates";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { CreditUsageContext } from "@/app/(context)/CreditUsageUpdate";
import CopyButton from "../_components/CopyButton";
import DeleteHistory from "../_components/DeleteHistory";
import { useUser } from "@clerk/nextjs";
import { AIoutput } from "@/utils/schema";
import { db } from "@/utils/PostgressDB";
import { eq } from "drizzle-orm";

const History = () => {
  const [history, setHistory] = useState([]); // To store AI responses
  const [template, setTemplate] = useState(Templates); // To store templates
  const { user } = useUser(); // Get logged-in user details
  const { updateCreditUsage, setUpdateCreditUsage } =
    useContext(CreditUsageContext);

  const getHistory = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.error("User email address is undefined.");
      return;
    }

    try {
      // Query the database for AI output history
      const result: any =
        (await db
          .select()
          .from(AIoutput)
          .where(eq(AIoutput.createdBy, email))) || [];
      setHistory(result); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching AI output history:", error);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await db.delete(AIoutput).where(eq(AIoutput.id, Number(id))); // the id is saved in Pgserial it is number so Convert id to number
      getHistory(); // Fetch updated history after deletion
      setUpdateCreditUsage(Date.now());
    } catch (error) {
      console.error("Error deleting AI output history item:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getHistory();
    }
  }, [user]); // Re-run whenever `user` changes

  return (
    <div className="m-4 p-5 bg-white shadow-lg border rounded-lg">
      {/* Header */}
      <p className="text-2xl font-bold mb-2">History</p>
      <p className="text-gray-600 mb-6">previously generated AI content</p>

      {/* Table Header */}
      <div className="grid md:grid-cols-5 grid-cols-2 gap-4 p-3 bg-gray-100 rounded-lg text-sm font-semibold">
        <p className="text-left">Template</p>
        <p className="text-left">AI Resp</p>
        <p className="hidden lg:block text-center pl-10">Date</p>
        <p className="hidden lg:block text-center pr-7">Words</p>
        <p className="hidden lg:block text-center pr-20">Actions</p>
      </div>

      {/* Table Body */}
      {history.map((item: any, index) => {
        const matchedTemplate = template.find(
          (temp) => temp.slug === item.templateSlug
        );

        return (
          <div
            key={index}
            className="grid md:grid-cols-6 grid-cols-2 gap-4 p-3 border-b items-center text-sm"
          >
            {/* Template Column */}
            <div className="flex items-center gap-2 col-span-1">
              {matchedTemplate && (
                <>
                  <Image
                    src={matchedTemplate.icon}
                    alt={matchedTemplate.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <p>{matchedTemplate.name}</p>
                </>
              )}
            </div>

            {/* AI Response Column */}
            <p className="md:col-span-2 md:gap-4 p-2 md:w-[70%]">
              {item.aiResponse.substring(0, 130) + "..."}
            </p>

            {/* Hidden Columns on Small Screens */}
            <p className="hidden lg:block">{item.createdAt}</p>
            <p className="hidden lg:block">{item.aiResponse.length}</p>
            <div className="hidden lg:flex justify-start gap-4">
              <CopyButton textToCopy={item.aiResponse} />
              <DeleteHistory
                id={item.id}
                deleteHistoryItem={deleteHistoryItem}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
